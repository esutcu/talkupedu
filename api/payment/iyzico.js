// İyzico Ödeme Entegrasyonu - Node.js API Endpoint örneği
// Bu dosya /api/payment/iyzico.js olarak kaydedilebilir (Serverless fonksiyon olarak)

const express = require('express');
const router = express.Router();
const Iyzipay = require('iyzipay');
const { createClient } = require('@supabase/supabase-js');

// Supabase bağlantısı 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// İyzico yapılandırması
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.NODE_ENV === 'production' 
    ? 'https://api.iyzipay.com' 
    : 'https://sandbox-api.iyzipay.com'
});

// Ödeme başlatma endpoint'i
router.post('/initialize', async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    
    // Kullanıcı ve paket bilgilerini al
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    const { data: creditPackage } = await supabase
      .from('credit_packages')
      .select('*')
      .eq('id', packageId)
      .single();
      
    if (!user || !creditPackage) {
      return res.status(404).json({ error: 'Kullanıcı veya paket bulunamadı' });
    }
    
    // Ödeme kaydı oluştur
    const { data: paymentLog } = await supabase
      .from('payment_logs')
      .insert({
        user_id: userId,
        package_id: packageId,
        status: 'pending'
      })
      .select()
      .single();
    
    // İyzico ödeme formu oluştur
    const request = {
      locale: 'tr',
      conversationId: paymentLog.id,
      price: creditPackage.price.toString(),
      paidPrice: creditPackage.price.toString(),
      currency: 'TRY',
      basketId: 'B' + Math.random().toString(36).substring(2, 7),
      paymentGroup: 'PRODUCT',
      callbackUrl: `${process.env.APP_URL}/payment-success?token=${paymentLog.id}`,
      
      buyer: {
        id: user.id,
        name: user.full_name.split(' ')[0],
        surname: user.full_name.split(' ')[1] || '',
        email: user.email,
        identityNumber: '11111111111', // İyzico için gerekli
        registrationAddress: 'Turkey',
        ip: req.ip || '127.0.0.1',
        city: 'Istanbul',
        country: 'Turkey'
      },
      
      shippingAddress: {
        contactName: user.full_name,
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Istanbul, Turkey'
      },
      
      billingAddress: {
        contactName: user.full_name,
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Istanbul, Turkey'
      },
      
      basketItems: [
        {
          id: creditPackage.id,
          name: creditPackage.name,
          category1: 'Credits',
          itemType: 'VIRTUAL',
          price: creditPackage.price.toString()
        }
      ]
    };
    
    iyzipay.checkoutFormInitialize.create(request, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Ödeme başlatılırken hata oluştu' });
      }
      
      return res.status(200).json({
        checkoutFormContent: result.checkoutFormContent,
        token: result.token
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Ödeme doğrulama endpoint'i
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    
    // İyzico token doğrulama
    const request = {
      locale: 'tr',
      token: token
    };
    
    iyzipay.checkoutForm.retrieve(request, async function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Ödeme doğrulanamadı' });
      }
      
      // Ödeme başarılı mı kontrol et
      if (result.paymentStatus === 'SUCCESS') {
        const paymentLogId = result.conversationId;
        
        // Ödeme kaydını güncelle
        const { data: paymentLog } = await supabase
          .from('payment_logs')
          .update({ status: 'success', iyzico_token: token })
          .eq('id', paymentLogId)
          .select()
          .single();
          
        if (!paymentLog) {
          return res.status(404).json({ success: false, message: 'Ödeme kaydı bulunamadı' });
        }
        
        // Kredi paketini al
        const { data: creditPackage } = await supabase
          .from('credit_packages')
          .select('amount')
          .eq('id', paymentLog.package_id)
          .single();
          
        // Kullanıcı kredilerini güncelle
        const { data: userCredit } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', paymentLog.user_id)
          .single();
        
        if (userCredit) {
          // Mevcut kredileri güncelle
          await supabase
            .from('user_credits')
            .update({ 
              credits: userCredit.credits + creditPackage.amount 
            })
            .eq('user_id', paymentLog.user_id);
        } else {
          // Yeni kredi kaydı oluştur
          await supabase
            .from('user_credits')
            .insert({ 
              user_id: paymentLog.user_id,
              credits: creditPackage.amount
            });
        }
        
        return res.status(200).json({ success: true, message: 'Ödeme başarılı' });
      } else {
        // Ödeme başarısız
        await supabase
          .from('payment_logs')
          .update({ status: 'failed' })
          .eq('id', result.conversationId);
          
        return res.status(400).json({ success: false, message: 'Ödeme başarısız' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
});

module.exports = router;