
/**
    以下为cordova 插件清单
*/

cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-media
cordova plugin add cordova-plugin-app-version
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add jpush-phonegap-plugin --variable API_KEY=7cc90eaad71ac3582d375f57
cordova plugin add cordova-plugin-qqsdk  --variable QQ_APP_ID=101246042
cordova plugin add cordova-plugin-weibosdk --variable WEIBO_APP_ID=2787606898
//微信插件
cordova plugin add cordova-plugin-wechat --variable wechatappid=wxe6e9760f0c17cb1c
//支付宝支付插件
cordova plugin add https://github.com/charleyw/cordova-plugin-alipay.git --variable PARTNER_ID=2088321021226094 --variable SELLER_ACCOUNT=daike.l@ichangtou.com --variable PRIVATE_KEY=MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJ9YCNM3eXfw7CpAn++KrhJp/bcot/0SVXhNRbsrsdrPlFcnJGnOdS52cRYaR8IJpRj5qkQ7lPic2tgw0BlZ5oQH2abxRROsTvU+sMCf5R8UZfad5i/GTxv0NBfMNxXJhZQP/qEsh6MWelrUwMR2VOjKFEZoiNpgb7c9piRlP37pAgMBAAECgYAfTcE2FYDkgk0zI80H1zvJXE8+y14R9qcZ4jxfv/7J2Nvwnzz1GF1HCne++ty8Dv8DQBEmJHpouQ/5RuWrBVFWsYQNogrEoYOB+bsKLQ78PJJ4SWOVY90snLT2gIv+842NHA3jttOLFwnAPs8MbC6WWisSPQ+xOAZY73gFc7fo7QJBAMuiPONYfuk8odK3IOxOGkNtqOigydJymkRe6YUwERxQa+Gfy0FhG6cFPhuG8QW82BD/K8YerDgp7Vm1L7GUBkMCQQDIUhM4pVM9guqXXE62zs5YJM484Qz3DSbryjiG9nw0i2sTugGMcLdNo4jWvz1VsQIsUZn3OCDC72AxgfKotPFjAkAlxt1A1+QDZOooayzCaeLZa3iQX3PRhM01rd3ohXhHJmw9GSXd5SP6IjDZbnk8NUJoNM5sHLiaWrzbjY9hhDJ9AkB4ObIpjCfCQiFTiGYBl2sGQci5hwRF/dG/MBXvAl4XFxnDtB4b0MZixWRqJkrEdEDuomb6legrtokQDYK6uCYrAkB5R7JvYlHlKcNDuDlm/EWoQLHAffQVAOQqCKdhj90Y9vS5qCUMuCnWiCsr2HmatXn2Qn1V8Bo04evJ4fMHtYlC
//在线更新插件 （发布环境必须）
cordova plugin add cordova-hot-code-push-plugin

//ios 环境需要额外添加
cordova plugin add cordova-plugin-wkwebview
cordova plugin add nl.kingsquare.cordova.background-audio
cordova plugin add com.rd11.remote-controls

/***下面的插件暂时不需要*******************/
cordova plugin add https://github.com/apache/cordova-plugins.git#master:wkwebview-engine-localhost
/*******************************/

//开发环境下 可能需要加上
//正式开包环境下 不需要加(一定要删除)
cordova plugin add cordova-hot-code-push-local-dev-addon
npm install -g cordova-hot-code-push-cli


//安卓 添加友盟统计插件 （友盟插件在有道云协作——SDK）
cordova plugin add [plugin路径]
//IOS 添加友盟插件 （需要配置AppDelegate.m文件）
cordova plugin add [plugin路径]
//安卓 友盟插件初始化
cordova/plftforms/android/src/com/changtou/MainActivity.java 修改为下面代码
__________________________________________________________________________
package com.changtou.ichangtou;

import android.os.Bundle;

import com.umeng.analytics.MobclickAgent;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        initUmengSDK();
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

    }

    private void initUmengSDK() {
        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_UM_NORMAL);
        MobclickAgent.setDebugMode(true);
        MobclickAgent.openActivityDurationTrack(false);
        // MobclickAgent.setSessionContinueMillis(1000);
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

}
__________________________________________________________________________
