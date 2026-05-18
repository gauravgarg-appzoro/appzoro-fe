import { NextRequest, NextResponse } from 'next/server'
import { maybeApplyDynamicRedirect } from './lib/urlRedirectsMiddleware'

export async function middleware(req: NextRequest, ev: any) {
    const url = req.url;
    const { pathname, origin } = req.nextUrl

    if (req.nextUrl.pathname === "/press") {
        return NextResponse.redirect(`${origin}/press-release`, 301)
    }
    if (req.nextUrl.pathname === "/contact") {
        return NextResponse.redirect(`${origin}/contact-us`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-atlanta") {
        return NextResponse.redirect(`${origin}/locations/atlanta-app-developers`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-boston") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-boston`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-los-angeles") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-los-angeles`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-san-francisco") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-francisco`, 301)
    }
    if (req.nextUrl.pathname === "/app-development-new-york-city") {
        return NextResponse.redirect(`${origin}/locations/app-development-new-york-city`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-london") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-london`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-miami") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-miami`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-chicago") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-chicago`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-san-diego") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-diego`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-virginia") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-virginia`, 301)
    }
    if (req.nextUrl.pathname === "/app-development-company") {
        return NextResponse.redirect(`${origin}/locations/app-development-company`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development") {
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/app-development-company-atlanta") {
        return NextResponse.redirect(`${origin}/locations/app-development-company-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-florida") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-florida`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-georgia") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-georgia`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-california") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-california`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-texas") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-texas`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-houston") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-houston`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-dallas") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-dallas`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-toronto") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-toronto`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/georgia-mobile-application-developers") {
        return NextResponse.redirect(`${origin}/locations/georgia-mobile-application-developers`, 301)
    }
    if (req.nextUrl.pathname === "/requestquote") {
        return NextResponse.redirect(`${origin}/contact-us`, 301)
    }
    if (req.nextUrl.pathname === "/process") {
        return NextResponse.redirect(`${origin}/getting-started`, 301)
    }
    if (req.nextUrl.pathname === "/free-initial-consultation") {
        return NextResponse.redirect(`${origin}/contact-us`, 301)
    }
    if (req.nextUrl.pathname === "/enterprise-solutions") {
        return NextResponse.redirect(`${origin}/services/web-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/web-app-development") {
        return NextResponse.redirect(`${origin}/services/web-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/react-native-development-company-chicago") {
        return NextResponse.redirect(`${origin}/technology/react`, 301)
    }
    if (req.nextUrl.pathname === "/flutter-app-development") {
        return NextResponse.redirect(`${origin}/technology/flutter`, 301)
    }
    if (
        req.nextUrl.pathname === "/react-native-development-company-texas" ||
        req.nextUrl.pathname === "/react-native-development-company-houston" ||
        req.nextUrl.pathname === "/react-native-development-company-georgia" ||
        req.nextUrl.pathname === "/react-native-development-company-boston" ||
        req.nextUrl.pathname === "/react-native-development-company-san-diego" ||
        req.nextUrl.pathname === "/react-native-development-new-york-city" ||
        req.nextUrl.pathname === "/react-native-development-company-san-francisco" ||
        req.nextUrl.pathname === "/react-native-development-company-los-angeles" ||
        req.nextUrl.pathname === "/react-native-developers"
    ) {
        return NextResponse.redirect(`${origin}/technology/react-native`, 301)
    }
    if (req.nextUrl.pathname === "/python-development-company") {
        return NextResponse.redirect(`${origin}/technology`, 301)
    }
    if (req.nextUrl.pathname === "/hire-android-app-developers") {
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/georgia-mobile-application-developers" || req.nextUrl.pathname === "georgia-mobile-app-developers") {
        return NextResponse.redirect(`${origin}/locations/georgia-mobile-application-developers`, 301)
    }
    if (req.nextUrl.pathname === "/blog-list") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/ui-ux-design") {
        return NextResponse.redirect(`${origin}/services/ui-ux-design-services`, 301)
    }
    if (req.nextUrl.pathname === "/atlanta-web-development") {
        return NextResponse.redirect(`${origin}/locations/atlanta-web-development`, 301)
    }
    //Redirect all to Homa page
    if (
        req.nextUrl.pathname === "/wp-admin/admin-ajax.php" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-object-fit.min.js" ||
        req.nextUrl.pathname === "/uploads/small_Mobile_App_Security_Complete_Guide_e778074d75.webp" ||
        req.nextUrl.pathname === "/uploads/Mobile_App_Security_Complete_Guide_e778074d75.webp" ||
        req.nextUrl.pathname === "/2021/05" ||
        req.nextUrl.pathname === "/2021/02" ||
        req.nextUrl.pathname === "/category/ipad" ||
        req.nextUrl.pathname === "/category/mobile-apps" ||
        req.nextUrl.pathname === "/category/video-post" ||
        req.nextUrl.pathname === "/2020/11" ||
        req.nextUrl.pathname === "/author/appzoro" ||
        req.nextUrl.pathname === "/category/instagram" ||
        req.nextUrl.pathname === "/tag/monetizing-app" ||
        req.nextUrl.pathname === "/category/fashion" ||
        req.nextUrl.pathname === "/free-" ||
        req.nextUrl.pathname === "/category/food-for-thought" ||
        req.nextUrl.pathname === "/2019/08" ||
        req.nextUrl.pathname === "/tag/digital-marketing" ||
        req.nextUrl.pathname === "/We" ||
        req.nextUrl.pathname === "/tag/android-vs-ios-market-share" ||
        req.nextUrl.pathname === "/2017/12" ||
        req.nextUrl.pathname === "/tag/is-android-or-ios-better" ||
        req.nextUrl.pathname === "/tag/android-vs-ios-development" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-element-closest.js" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-dom-rect.js" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-url.js" ||
        req.nextUrl.pathname === "/2018/09" ||
        req.nextUrl.pathname === "/category/seo" ||
        req.nextUrl.pathname === "/2017/10" ||
        req.nextUrl.pathname === "/category/app-store" ||
        req.nextUrl.pathname === "/category/ui-ux-design" ||
        req.nextUrl.pathname === "/2021/03" ||
        req.nextUrl.pathname === "/category/web-design" ||
        req.nextUrl.pathname === "/2019/12" ||
        req.nextUrl.pathname === "/category/app-marketing" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-formdata.min.js" ||
        req.nextUrl.pathname === "/tag/app-indexing" ||
        req.nextUrl.pathname === "/tag/artificial-intelligence" ||
        req.nextUrl.pathname === "/tag/mobile-development" ||
        req.nextUrl.pathname === "/tag/best-ways-to-improve-app-reviews" ||
        req.nextUrl.pathname === "/2017/03" ||
        req.nextUrl.pathname === "/tag/increase-mobile-app-reviews" ||
        req.nextUrl.pathname === "/tag/how-to-increase-mobile-app-reviews" ||
        req.nextUrl.pathname === "/tag/mobile-applications-reviews" ||
        req.nextUrl.pathname === "/2018/11/14" ||
        req.nextUrl.pathname === "/2017/07" ||
        req.nextUrl.pathname === "/tag/app-reviews-on-play-store" ||
        req.nextUrl.pathname === "/tag/key-benefits-of-kotlin-language" ||
        req.nextUrl.pathname === "/tag/india-stack" ||
        req.nextUrl.pathname === "/tag/mobile-apps-company-atlanta" ||
        req.nextUrl.pathname === "/tag/email-marketing" ||
        req.nextUrl.pathname === "/tag/machine-learning" ||
        req.nextUrl.pathname === "/blog/best-mobile-app-" ||
        req.nextUrl.pathname === "/tag/ios-app-development-language" ||
        req.nextUrl.pathname === "/category/technology" ||
        req.nextUrl.pathname === "/tag/appzoro-technologies-inc" ||
        req.nextUrl.pathname === "/category/digital-marketing" ||
        req.nextUrl.pathname === "/tag/kotlin-function" ||
        req.nextUrl.pathname === "/tag/benefits-of-kotlin" ||
        req.nextUrl.pathname === "/tag/kotlin-programming" ||
        req.nextUrl.pathname === "/tag/mobile-ui-ux-design" ||
        req.nextUrl.pathname === "/category/app-development-trends" ||
        req.nextUrl.pathname === "/tag/android-application-development-company" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-object-fit.js" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-node-contains.min.js" ||
        req.nextUrl.pathname === "/blog/why-small-businesses-" ||
        req.nextUrl.pathname === "/tag/why-kotlin-for-android-development" ||
        req.nextUrl.pathname === "/tag/mobile-ui-design" ||
        req.nextUrl.pathname === "/tag/adobe-xd-tool" ||
        req.nextUrl.pathname === "/tag/mobile-app-ui-design-tool" ||
        req.nextUrl.pathname === "/tag/business-solutions-and-mobile-apps" ||
        req.nextUrl.pathname === "/tag/mobile-app-development-companies-atlanta" ||
        req.nextUrl.pathname === "/tag/mobile-apps-development-company" ||
        req.nextUrl.pathname === "/tag/iphone-app-development" ||
        req.nextUrl.pathname === "/category/development-frameworks" ||
        req.nextUrl.pathname === "/tag/iphone-apps-development-company" ||
        req.nextUrl.pathname === "/us/iphone-app-development-atlanta/ios-apps/hotelier" ||
        req.nextUrl.pathname === "/tag/ui-ux-design" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-node-contains.js" ||
        req.nextUrl.pathname === "/tag/mobile-apps" ||
        req.nextUrl.pathname === "/category/ios-apps" ||
        req.nextUrl.pathname === "/2020/03" ||
        req.nextUrl.pathname === "/category/iot" ||
        req.nextUrl.pathname === "/category/ios-app-development" ||
        req.nextUrl.pathname === "/category/enterprise" ||
        req.nextUrl.pathname === "/tag/technical-startups" ||
        req.nextUrl.pathname === "/category/mobile-apps-for-businesses" ||
        req.nextUrl.pathname === "/category/web-development" ||
        req.nextUrl.pathname === "/tag/kotlin-basics" ||
        req.nextUrl.pathname === "/2019/09/11" ||
        req.nextUrl.pathname === "/tag/native-applications" ||
        req.nextUrl.pathname === "/tag/first-mobile-app" ||
        req.nextUrl.pathname === "/tag/user-experience" ||
        req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-fetch.min.js" ||
        req.nextUrl.pathname === "/tag/small-businesses" ||
        req.nextUrl.pathname === "/tag/mobile-app-indexing" ||
        req.nextUrl.pathname === "/copythat" ||
        req.nextUrl.pathname === "/2020/06" ||
        req.nextUrl.pathname === "/tag/android-vs-ios" ||
        req.nextUrl.pathname === "/category/businesses" ||
        req.nextUrl.pathname === "/category/google-play-store" ||
        req.nextUrl.pathname === "/tag/apps-development" ||
        req.nextUrl.pathname === "/uploads/Ed_Bolian_70x70_2b4c17c59c.jpg" ||
        req.nextUrl.pathname === "/uploads/app_dev_us_9dfa7ae777.png" ||
        req.nextUrl.pathname === "/uploads/crowdforapp_382e4060ac.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Max_Hockley_29778a2407.jpg" ||
        req.nextUrl.pathname === "/uploads/Doug_Thompson_Beverage_Solution_Group_a48881630f_8098bb85d0.jpg" ||
        req.nextUrl.pathname === "/uploads/Michael_Patterson_70x70_66fef10d20.jpg" ||
        req.nextUrl.pathname === "/uploads/Thad_Joseph_70x70_3be7e7df04.jpg" ||
        req.nextUrl.pathname === "/uploads/Tobin_B_Uspace_5d9d18168c_c06dcdc365.jpg" ||
        req.nextUrl.pathname === "/uploads/Kevin_Murnane_70x70_5cbd852722.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_appfutura_badge_5_c2a1e5eff8.jpg" ||
        req.nextUrl.pathname === "/uploads/ATV_Village_7d7bf8e3ef.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_toplogo_319f5d443b.png" ||
        req.nextUrl.pathname === "/uploads/1624989129546_5f20b825ac_149296a2b0.jpg" ||
        req.nextUrl.pathname === "/uploads/goodfirm2_3adedf50de.png" ||
        req.nextUrl.pathname === "/uploads/Best_App_Design_Agency_by_Design_Rush_App_Zoro_Technologies_405ef32b8b.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_google_partner_card_ef3b16afa3.png" ||
        req.nextUrl.pathname === "/uploads/press_june_2_18_52af9881f4.png" ||
        req.nextUrl.pathname === "/uploads/goodfirm_ad9f73cbff.png" ||
        req.nextUrl.pathname === "/uploads/Untitled_d6bd4c4e8c.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Best_App_Design_Agency_by_Design_Rush_App_Zoro_Technologies_405ef32b8b.png" ||
        req.nextUrl.pathname === "/uploads/Max_Hockley_29778a2407.jpg" ||
        req.nextUrl.pathname === "/uploads/Paawan_Mathur_70x70_d66cfe62b3.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_App_Zoro_in_Top_B2_B_Companies_in_Georgia_by_Clutch_1_974546b2b8.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_appfutura_badge_8_0a911c0fc4.jpg" ||
        req.nextUrl.pathname === "/uploads/Robert_Herrera_70x70_87434377af.jpg" ||
        req.nextUrl.pathname === "/uploads/google_partner_card_ef3b16afa3.png" ||
        req.nextUrl.pathname === "/uploads/Josh_Chamberlain_70x70_f98b6f7a8c.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_aws_logo_cec2b1c35f.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_clutch_card_31bf24c3bc.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_press_june_2_18_52af9881f4.png" ||
        req.nextUrl.pathname === "/uploads/toplogo_319f5d443b.png" ||
        req.nextUrl.pathname === "/uploads/App_Zoro_is_now_Design_Rush_Accredited_Company_of_2021_9fbc429bbc.jpg" ||
        req.nextUrl.pathname === "/uploads/Phil_Ackley_ca5b4d2f08.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Untitled_1ed328d3c8.png" ||
        req.nextUrl.pathname === "/uploads/Untitled_1ed328d3c8.png" ||
        req.nextUrl.pathname === "/uploads/Karen_Houghton_70x70_37504f484a.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_goodfirms_interview_series_with_sam_7c6b2f7ef6_bb61f8bed6.jpg" ||
        req.nextUrl.pathname === "/uploads/1643143210377_969d5a1fa8_70ab057912.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_crowdforapp_382e4060ac.png" ||
        req.nextUrl.pathname === "/uploads/Josh_Chamberlain_Sitter_Sanity_6fedb1422d_e44fef4626.jpg" ||
        req.nextUrl.pathname === "/uploads/expertise_d260d211e1.png" ||
        req.nextUrl.pathname === "/uploads/Voyage_ATL_fb5d660856.png" ||
        req.nextUrl.pathname === "/uploads/aws_logo_cec2b1c35f.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_1643143210377_969d5a1fa8_70ab057912.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_expertise_d260d211e1.png" ||
        req.nextUrl.pathname === "/uploads/carey_markey_cbf9f4efaa.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_goodfirm_ad9f73cbff.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Untitled_d6bd4c4e8c.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_App_Zoro_is_now_Design_Rush_Accredited_Company_of_2021_9fbc429bbc.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_goodfirm2_3adedf50de.png" ||
        req.nextUrl.pathname === "/uploads/b2b_companies_Georgia_6b21375b81.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_b2b_companies_Georgia_6b21375b81.png" ||
        req.nextUrl.pathname === "/uploads/goodfirms_interview_series_with_sam_7c6b2f7ef6_bb61f8bed6.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_app_dev_us_9dfa7ae777.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_ATV_Village_7d7bf8e3ef.png" ||
        req.nextUrl.pathname === "/uploads/Lata_Sharma_Imsafenow_e8f3fd069a_ffccad19b3.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_carey_markey_cbf9f4efaa.jpg" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Cobot_05ccdabced.png" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Voyage_ATL_fb5d660856.png" ||
        req.nextUrl.pathname === "/uploads/clutch_card_31bf24c3bc.png" ||
        req.nextUrl.pathname === "/uploads/App_Zoro_in_Top_B2_B_Companies_in_Georgia_by_Clutch_1_974546b2b8.png" ||
        req.nextUrl.pathname === "/uploads/Cobot_05ccdabced.png" ||
        req.nextUrl.pathname === "/uploads/appfutura_badge_8_0a911c0fc4.jpg" ||
        req.nextUrl.pathname === "/uploads/appfutura_badge_5_c2a1e5eff8.jpg" ||
        req.nextUrl.pathname === "/tag/adobe-xd" ||
        req.nextUrl.pathname === "/tag/web-development" ||
        req.nextUrl.pathname === "/tag/mobile-ui-design-app" ||
        req.nextUrl.pathname === "/tag/first-tech-mobile-app" ||
        req.nextUrl.pathname === "/tag/android-oreo-features" ||
        req.nextUrl.pathname === "/tag/first-mobile-application" ||
        req.nextUrl.pathname === "/tag/mobile-application-development" ||
        req.nextUrl.pathname === "/tag/mobile-applications-and-businesses" ||
        req.nextUrl.pathname === "/2021/04" ||
        req.nextUrl.pathname === "/tag/android-version" ||
        req.nextUrl.pathname === "/tag/how-to-develop-mobile-app/" ||
        req.nextUrl.pathname === "/uploads/Spa_Space_Casestudy_bd28bf73be.pdf" ||
        req.nextUrl.pathname === "/uploads/Default_1bd432a476_fd29671aa9.webp" ||
        req.nextUrl.pathname === "/uploads/small_Default_1bd432a476_fd29671aa9.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_0b0f5ad977.webp" ||
        req.nextUrl.pathname === "/uploads/OSS_Casestudy_1b62ccf0ac.pdf" ||
        req.nextUrl.pathname === "/uploads/Credit_Case_Study_0d9eada8c4.pdf" || 
        req.nextUrl.pathname === "/uploads/Polisci_Casestudy_7b6011724a.pdf" ||
        req.nextUrl.pathname === "/uploads/ADR_Case_Study_03c800500e.pdf" ||
        req.nextUrl.pathname === "/uploads/Sara_Hospitality_Casestudy_bc1c62d937.pdf" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_630237cbba.webp" ||
        req.nextUrl.pathname === "/uploads/Im_Safe_NOW_591763ee8e.pdf" ||
        req.nextUrl.pathname === "/uploads/ATV_Case_Study_260cc9fc45.pdf" ||
        req.nextUrl.pathname === "/uploads/Fitnessbank_Casestudy_8c2c0b4311.pdf" ||
        req.nextUrl.pathname === "/uploads/Kwik_Case_Study_e3d18095f9.pdf" ||
        req.nextUrl.pathname === "/uploads/AMC_n_ME_Case_Study_efdf67b9a7.pdf" ||
        req.nextUrl.pathname === "/uploads/Dreambook_Casestudy_fd4aeec6a2.pdf" ||
        req.nextUrl.pathname === "/uploads/Milton_Case_Study_9b27724be7.pdf" ||
        req.nextUrl.pathname === "/uploads/Faith_Aid_Casestudy_cda75039ac.pdf" ||
        req.nextUrl.pathname === "/uploads/TYW_Casestudy_136e044a66.pdf" ||
        req.nextUrl.pathname === "/uploads/Apex_Textile_Case_Study_7299a00f90.pdf" ||
        req.nextUrl.pathname === "/uploads/Turns_Casestudy_f0f78131f6.pdf" ||
        req.nextUrl.pathname === "/uploads/Uspace_Casestudy_2aa1bdb920.pdf" ||
        req.nextUrl.pathname === "/uploads/Vumi_Casestudy_b17080abf1.pdf" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_c0176401b4.webp" ||
        req.nextUrl.pathname === "/uploads/Joseline_1ab957a0b0.pdf" ||
        req.nextUrl.pathname === "/uploads/Built_X_eadab83a79.pdf" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_8c01da4117.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Default_1bd432a476_fd29671aa9.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_4047f0b9c3.webp" ||
        req.nextUrl.pathname === "/uploads/Guardian_Casestudy_0b6e1f1209.pdf" ||
        req.nextUrl.pathname === "/uploads/Skoozi_Casestudy_7bbc83e18d.pdf" ||
        req.nextUrl.pathname === "/uploads/Radio_Trax_Casestudy_4f5c2e52d3.pdf" ||
        req.nextUrl.pathname === "/uploads/Sitter_Sanity_Casestudy_34c19e1a3a.pdf" ||
        req.nextUrl.pathname === "/uploads/Ball_Talk_Case_Study_1a473350aa.pdf" ||
        req.nextUrl.pathname === "/uploads/shubhangi_jangam_Milton_c7aeaf5333_e5b55d8e4c.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_41dfd21422.webp" ||
        req.nextUrl.pathname === "/wp-admin/admin-ajax.php" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_aab7942b1a.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_8c01352ca7.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_ba387de80e_69b3ef2200.webp" ||
        req.nextUrl.pathname === "/uploads/ADR_Case_Study_656cd860ea.pdf" ||
        req.nextUrl.pathname === "/uploads/Cowork_Oasis_Casestudy_aa51f97873.pdf" ||
        req.nextUrl.pathname === "/uploads/ATV_Case_Study_7fe847a57c.pdf" ||
        req.nextUrl.pathname === "/uploads/AMC_n_ME_Case_Study_5f6c512ce1.pdf" ||
        req.nextUrl.pathname === "/uploads/Faith_Aid_Casestudy_a4819b4fcb.pdf" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_8c01352ca7.webp" ||
        req.nextUrl.pathname === "/uploads/Dreambook_Casestudy_4d204f4bb1.pdf" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Dreambook_and_planner_Client_review_on_Clutch_b356b55980_c051af89ee.webp" ||
        req.nextUrl.pathname === "/uploads/Tobin_B_Uspace_5d9d18168c_36fe3d00da.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_6fed386f06.webp" ||
        req.nextUrl.pathname === "/uploads/small_Dreambook_and_planner_Client_review_on_Clutch_b356b55980_c051af89ee.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_afb1b459ba.webp" ||
        req.nextUrl.pathname === "/uploads/Michael_Patterson_1_4c5ee5264a_6ddd22b1c0.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_b9ac652c70.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_cfc5ba2860.webp" ||
        req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_8c01da4117.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_7c6d3ceca9.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_afb1b459ba.webp" ||
        req.nextUrl.pathname === "/portfolio/gls-georgia-library-" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_0b0f5ad977.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_630237cbba.webp" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_5483b3d44a.webp" ||
        req.nextUrl.pathname === "/web-accessibility-guidelines-best-practices-for-your-website" ||
        req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_ed08c840e8.webp"
    ) {
        return NextResponse.redirect(`${origin}/`, 301)
    }



    //Need to change urls
    if (req.nextUrl.pathname === "/portfolio_old") {
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/ven-u2-go/undefinedportfolio/ven-u2-go") {
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go`, 301)
    }
    if (req.nextUrl.pathname === "/case-study/[slug]") {
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/medcraze/undefinedportfolio/medcraze") {
        return NextResponse.redirect(`${origin}/case-study/medcraze`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/vinwiki/undefinedportfolio/vinwiki") {
        return NextResponse.redirect(`${origin}/case-study/vinwiki/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/jax/undefinedportfolio/jax") {
        return NextResponse.redirect(`${origin}/case-study/car-rental-fleet-management-software`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/hotspawts/undefinedportfolio/hotspawts") {
        return NextResponse.redirect(`${origin}/case-study/hotspawts/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/skoozi/undefinedportfolio/skoozi") {
        return NextResponse.redirect(`${origin}/case-study/skoozi/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio") {
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/turns-financing/undefinedportfolio/turns-financing") {
        return NextResponse.redirect(`${origin}/case-study/turns-financing/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/apex-textile-company/undefinedportfolio/apex-textile-company") {
        return NextResponse.redirect(`${origin}/case-study/apex-textile-company/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/judicial-innovations/undefinedportfolio/judicial-innovations") {
        return NextResponse.redirect(`${origin}/case-study/judicial-innovations/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/guardian/undefinedportfolio/guardian") {
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/vumi/undefinedportfolio/vumi") {
        return NextResponse.redirect(`${origin}/case-study/vumi/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/vumi") {
        return NextResponse.redirect(`${origin}/case-study/vumi/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/webapp-spa-space/undefinedportfolio/webapp-spa-space") {
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/amc-n-me/undefinedportfolio/amc-n-me") {
        return NextResponse.redirect(`${origin}/case-study/amc-n-me/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/imsafenow/undefinedportfolio/imsafenow") {
        return NextResponse.redirect(`${origin}/case-study/imsafenow/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/money-hungry/undefinedportfolio/money-hungry") {
        return NextResponse.redirect(`${origin}/case-study/money-hungry/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/joseline/undefinedportfolio/joseline") {
        return NextResponse.redirect(`${origin}/case-study/joseline/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/uspace/undefinedportfolio/uspace") {
        return NextResponse.redirect(`${origin}/case-study/uspace/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/official-atlanta-tech-village-app-coworking-space/undefinedportfolio/official-atlanta-tech-village-app-coworking-space") {
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-coworking-space`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/shareplay/undefinedportfolio/shareplay") {
        return NextResponse.redirect(`${origin}/case-study/shareplay`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/dreambook/undefinedportfolio/dreambook") {
        return NextResponse.redirect(`${origin}/case-study/dreambook/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/kwik/undefinedportfolio/kwik") {
        return NextResponse.redirect(`${origin}/case-study/kwik/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/radio-trax/undefinedportfolio/radio-trax") {
        return NextResponse.redirect(`${origin}/case-study/radio-trax/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/cigaremo/undefinedportfolio/cigaremo") {
        return NextResponse.redirect(`${origin}/case-study/cigaremo/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/get-sound/undefinedportfolio/get-sound") {
        return NextResponse.redirect(`${origin}/case-study/get-sound/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/copythat/undefinedportfolio/copythat") {
        return NextResponse.redirect(`${origin}/case-study/copythat`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/sara-hospitality/undefinedportfolio/sara-hospitality") {
        return NextResponse.redirect(`${origin}/case-study/sara-hospitality/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/balltalk/undefinedportfolio/balltalk") {
        return NextResponse.redirect(`${origin}/case-study/balltalk/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/fitness-bank/undefinedportfolio/fitness-bank") {
        return NextResponse.redirect(`${origin}/case-study/fitness-bank/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/sitter-sanity/undefinedportfolio/sitter-sanity") {
        return NextResponse.redirect(`${origin}/case-study/sitter-sanity/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/the-hoteliers-network/undefinedportfolio/the-hoteliers-network") {
        return NextResponse.redirect(`${origin}/case-study/the-hoteliers-network/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/beverage-solutions-group/undefinedportfolio/beverage-solutions-group") {
        return NextResponse.redirect(`${origin}/case-study/beverage-solutions-group`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/built-x/undefinedportfolio/built-x") {
        return NextResponse.redirect(`${origin}/case-study/built-x/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/fugleam/undefinedportfolio/fugleam") {
        return NextResponse.redirect(`${origin}/case-study/fugleam/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/faithaid/undefinedportfolio/faithaid") {
        return NextResponse.redirect(`${origin}/case-study/faithaid/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/gls-georgia-library-service/undefinedportfolio/gls-georgia-library-service") {
        return NextResponse.redirect(`${origin}/case-study/gls-georgia-library-service/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/city-of-milton/undefinedportfolio/city-of-milton") {
        return NextResponse.redirect(`${origin}/case-study/city-of-milton`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/open-on-sunday/undefinedportfolio/open-on-sunday") {
        return NextResponse.redirect(`${origin}/case-study/open-on-sunday`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/cowork-oasis/undefinedportfolio/cowork-oasis") {
        return NextResponse.redirect(`${origin}/case-study/cowork-oasis`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/uspace-3") {
        return NextResponse.redirect(`${origin}/case-study/uspace`, 301)
    }
    if (req.nextUrl.pathname === "/top-most-popular-websites/undefinedtop-most-popular-websites") {
        return NextResponse.redirect(`${origin}/blog/top-most-popular-websites`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/ios-apps-get-sound") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-skoozi") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/judicial-innovations") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-amc-n-me") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/the-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting/undefinedthe-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting") {
        return NextResponse.redirect(`${origin}/blog/the-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/web-apps-bobchats") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-fugleam") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/android-apps-money-hungry") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/spa-space-2") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/official-atlanta-tech-village-app-coworking-space") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/ios-apps-faithaid") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/city-of-milton-3") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-security-complete-guide/undefinedmobile-app-security-complete-guide") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-security-complete-guide`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-las-vegas") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-fitness-bank") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/best-web-development-tools-free-paid/undefinedbest-web-development-tools-free-paid") {
        return NextResponse.redirect(`${origin}/blog/best-web-development-tools-free-paid`, 301)
    }
    if (req.nextUrl.pathname === "/best-web-design-software/undefinedbest-web-design-software") {
        return NextResponse.redirect(`${origin}/blog/best-web-design-software`, 301)
    }
    if (req.nextUrl.pathname === "/2021/05") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/how-to-improve-app-review") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/undefinedincreasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how") {
        return NextResponse.redirect(`${origin}/blog/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-florida") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-florida`, 301)
    }
    if (req.nextUrl.pathname === "/our-work/android-apps-venu2go") {
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go`, 301)
    }
    if (req.nextUrl.pathname === "/best-free-wireframe-tools-2023/undefinedbest-free-wireframe-tools-2023") {
        return NextResponse.redirect(`${origin}/blog/best-free-wireframe-tools-2023`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-enable-dark-mode-for-your-apps-save-battery-enhance-vision/undefinedhow-to-enable-dark-mode-for-your-apps-save-battery-enhance-vision") {
        return NextResponse.redirect(`${origin}/blog/how-to-enable-dark-mode-for-your-apps-save-battery-enhance-vision`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-los-angeles") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-los-angeles`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-developer-denver") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/us/app-development-new-york-city") {
        return NextResponse.redirect(`${origin}/locations/app-development-new-york-city`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-san-diego") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-diego`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-texas") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-texas`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-san-francisco") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-francisco`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-seattle") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/copythat") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-reduce-the-size-of-your-iphone-app/undefinedhow-to-reduce-the-size-of-your-iphone-app") {
        return NextResponse.redirect(`${origin}/blog/how-to-reduce-the-size-of-your-iphone-app`, 301)
    }
    if (req.nextUrl.pathname === "/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta/undefinedwhy-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta") {
        return NextResponse.redirect(`${origin}/blog/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/upcoming-web-design-trends-in-2023/undefinedupcoming-web-design-trends-in-2023") {
        return NextResponse.redirect(`${origin}/blog/upcoming-web-design-trends-in-2023`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-is-a-top-atlanta-company/undefinedappzoro-technologies-is-a-top-atlanta-company") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-is-a-top-atlanta-company`, 301)
    }
    if (req.nextUrl.pathname === "/which-is-better-for-my-first-app-android-or-ios/undefinedwhich-is-better-for-my-first-app-android-or-ios") {
        return NextResponse.redirect(`${origin}/blog/which-is-better-for-my-first-app-android-or-ios`, 301)
    }
    if (req.nextUrl.pathname === "/know-more-about-india-stack/undefinedknow-more-about-india-stack") {
        return NextResponse.redirect(`${origin}/blog/know-more-about-india-stack`, 301)
    }
    if (req.nextUrl.pathname === "/how-iot-is-helpful-to-success-in-e-scooter-app-development/undefinedhow-iot-is-helpful-to-success-in-e-scooter-app-development") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/best-back-end-web-development-tools/undefinedbest-back-end-web-development-tools") {
        return NextResponse.redirect(`${origin}/blog/best-back-end-web-development-tools`, 301)
    }
    if (req.nextUrl.pathname === "/the-best-android-apps-of-2017/undefinedthe-best-android-apps-of-2017") {
        return NextResponse.redirect(`${origin}/blog/the-best-android-apps-of-2017`, 301)
    }
    if (req.nextUrl.pathname === "/common-concerns-while-making-you-own-first-android-app/feed") {
        return NextResponse.redirect(`${origin}/blog/common-concerns-while-making-you-own-first-android-app`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/kwik-3") {
        return NextResponse.redirect(`${origin}/blog/common-concerns-while-making-you-own-first-android-app`, 301)
    }
    if (req.nextUrl.pathname === "/few-tips-for-tech-startup-to-transform-your-business/undefinedfew-tips-for-tech-startup-to-transform-your-business") {
        return NextResponse.redirect(`${origin}/blog/few-tips-for-tech-startup-to-transform-your-business`, 301)
    }
    if (req.nextUrl.pathname === "/programming-languages-for-mobile-app-development/undefinedprogramming-languages-for-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/programming-languages-for-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/4-ways-blockchain-is-the-future-of-banking/undefined4-ways-blockchain-is-the-future-of-banking") {
        return NextResponse.redirect(`${origin}/blog/4-ways-blockchain-is-the-future-of-banking`, 301)
    }
    if (req.nextUrl.pathname === "/10-best-phone-location-tracking-apps-without-permission/undefined10-best-phone-location-tracking-apps-without-permission") {
        return NextResponse.redirect(`${origin}/blog/10-best-phone-location-tracking-apps-without-permission`, 301)
    }
    if (req.nextUrl.pathname === "/7-reasons-why-you-should-use-react-js-for-web-development/undefined7-reasons-why-you-should-use-react-js-for-web-development") {
        return NextResponse.redirect(`${origin}/blog/7-reasons-why-you-should-use-react-js-for-web-development`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-cowork-oasis") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/live-streaming-app-development-complete-guide/undefinedlive-streaming-app-development-complete-guide") {
        return NextResponse.redirect(`${origin}/blog/live-streaming-app-development-complete-guide`, 301)
    }
    if (req.nextUrl.pathname === "/iot-applications-the-use-of-iot-for-education-system/undefinediot-applications-the-use-of-iot-for-education-system") {
        return NextResponse.redirect(`${origin}/blog/iot-applications-the-use-of-iot-for-education-system`, 301)
    }
    if (req.nextUrl.pathname === "/tips-to-increase-your-app-reviews/feed") {
        return NextResponse.redirect(`${origin}/blog/tips-to-increase-your-app-reviews`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-application-testing/undefinedmobile-application-testing") {
        return NextResponse.redirect(`${origin}/blog/mobile-application-testing`, 301)
    }
    if (req.nextUrl.pathname === "/4-tips-you-need-to-know-when-building-ui-ux-on-mobile/undefined4-tips-you-need-to-know-when-building-ui-ux-on-mobile") {
        return NextResponse.redirect(`${origin}/blog/4-tips-you-need-to-know-when-building-ui-ux-on-mobile`, 301)
    }
    if (req.nextUrl.pathname === "/top-9-benefits-of-custom-mobile-application-development/undefinedtop-9-benefits-of-custom-mobile-application-development") {
        return NextResponse.redirect(`${origin}/blog/top-9-benefits-of-custom-mobile-application-development`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-fitness-bank") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/blog-why-should-you-hire-appzoro-technology-for-android-app-development/undefinedblog-why-should-you-hire-appzoro-technology-for-android-app-development") {
        return NextResponse.redirect(`${origin}/blog/blog-why-should-you-hire-appzoro-technology-for-android-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/instagram-analytics-the-best-way-to-analyze-your-instagram-audience/undefinedinstagram-analytics-the-best-way-to-analyze-your-instagram-audience") {
        return NextResponse.redirect(`${origin}/blog/instagram-analytics-the-best-way-to-analyze-your-instagram-audience`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-process/undefinedmobile-app-development-process") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-process`, 301)
    }
    if (req.nextUrl.pathname === "/flutter-app-development-pros-and-cons/undefinedflutter-app-development-pros-and-cons") {
        return NextResponse.redirect(`${origin}/blog/flutter-app-development-pros-and-cons`, 301)
    }
    if (req.nextUrl.pathname === "/grocery-delivery-app-development-guide/undefinedgrocery-delivery-app-development-guide") {
        return NextResponse.redirect(`${origin}/blog/grocery-delivery-app-development-guide`, 301)
    }
    if (req.nextUrl.pathname === "/7-most-popular-web-frameworks-for-development-in-2021/undefined7-most-popular-web-frameworks-for-development-in-2021") {
        return NextResponse.redirect(`${origin}/blog/7-most-popular-web-frameworks-for-development-in-2021`, 301)
    }
    if (req.nextUrl.pathname === "/upcity-awards-appzoro-technologies-as-best-of-georgia-winner-2023/undefinedupcity-awards-appzoro-technologies-as-best-of-georgia-winner-2023") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/how-many-people-does-it-take-to-develop-a-mobile-app/undefinedhow-many-people-does-it-take-to-develop-a-mobile-app") {
        return NextResponse.redirect(`${origin}/blog/how-many-people-does-it-take-to-develop-a-mobile-app`, 301)
    }
    if (req.nextUrl.pathname === "/modern-mobile-app-development-cutting-edge-trends-you-should-not-miss/undefinedmodern-mobile-app-development-cutting-edge-trends-you-should-not-miss") {
        return NextResponse.redirect(`${origin}/blog/modern-mobile-app-development-cutting-edge-trends-you-should-not-miss`, 301)
    }
    if (req.nextUrl.pathname === "/best-php-development-tools/undefinedbest-php-development-tools") {
        return NextResponse.redirect(`${origin}/blog/best-php-development-tools`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-issues-warning-against-scam-site-appzoro-online/undefinedappzoro-technologies-issues-warning-against-scam-site-appzoro-online") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-issues-warning-against-scam-site-appzoro-online`, 301)
    }
    if (req.nextUrl.pathname === "/best-front-end-web-developments-tools/undefinedbest-front-end-web-developments-tools") {
        return NextResponse.redirect(`${origin}/blog/best-front-end-web-developments-tools`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps/undefinedmobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps") {
        return NextResponse.redirect(`${origin}/blog/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps`, 301)
    }
    if (req.nextUrl.pathname === "/kotlin-vs-java-which-one-is-better-for-android-applications/undefinedkotlin-vs-java-which-one-is-better-for-android-applications") {
        return NextResponse.redirect(`${origin}/blog/kotlin-vs-java-which-one-is-better-for-android-applications`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-caters-to-all-that-belongs-to-it-goodfirms/undefinedappzoro-caters-to-all-that-belongs-to-it-goodfirms") {
        return NextResponse.redirect(`${origin}/blog/appzoro-caters-to-all-that-belongs-to-it-goodfirms`, 301)
    }
    if (req.nextUrl.pathname === "/framework-for-mobile-app-development-2021-2022/undefinedframework-for-mobile-app-development-2021-2022") {
        return NextResponse.redirect(`${origin}/framework-for-mobile-app-development-2021-2022`, 301)
    }
    if (req.nextUrl.pathname === "/choosing-the-best-mobile-app-development-technology/undefinedchoosing-the-best-mobile-app-development-technology") {
        return NextResponse.redirect(`${origin}/blog/choosing-the-best-mobile-app-development-technology`, 301)
    }
    if (req.nextUrl.pathname === "/is-mobile-app-development-worth-it-for-your-business/undefinedis-mobile-app-development-worth-it-for-your-business") {
        return NextResponse.redirect(`${origin}/blog/is-mobile-app-development-worth-it-for-your-business`, 301)
    }
    if (req.nextUrl.pathname === "/common-concerns-while-making-you-own-first-android-app/undefinedcommon-concerns-while-making-you-own-first-android-app") {
        return NextResponse.redirect(`${origin}/blog/common-concerns-while-making-you-own-first-android-app`, 301)
    }
    if (req.nextUrl.pathname === "/best-ide-for-android-development-of-2022/undefinedbest-ide-for-android-development-of-2022") {
        return NextResponse.redirect(`${origin}/blog/common-concerns-while-making-you-own-first-android-app`, 301)
    }
    if (req.nextUrl.pathname === "/7-tips-for-a-successful-mobile-app-launch/undefined7-tips-for-a-successful-mobile-app-launch") {
        return NextResponse.redirect(`${origin}/blog/7-tips-for-a-successful-mobile-app-launch`, 301)
    }
    if (req.nextUrl.pathname === "/best-prototyping-tools/undefinedbest-prototyping-tools") {
        return NextResponse.redirect(`${origin}/blog/best-prototyping-tools`, 301)
    }
    if (req.nextUrl.pathname === "/host-an-app-to-google-play-store/undefinedhost-an-app-to-google-play-store") {
        return NextResponse.redirect(`${origin}/blog/best-prototyping-tools`, 301)
    }
    if (req.nextUrl.pathname === "/future-of-web-development-2023-top-10-technologies/undefinedfuture-of-web-development-2023-top-10-technologies") {
        return NextResponse.redirect(`${origin}/blog/future-of-web-development-2023-top-10-technologies`, 301)
    }
    if (req.nextUrl.pathname === "/open-source-api-management-platforms-in-2023/undefinedopen-source-api-management-platforms-in-2023") {
        return NextResponse.redirect(`${origin}/blog/future-of-web-development-2023-top-10-technologies`, 301)
    }
    if (req.nextUrl.pathname === "/top-7-tech-stack-you-need-to-look-out/undefinedtop-7-tech-stack-you-need-to-look-out") {
        return NextResponse.redirect(`${origin}/blog/top-7-tech-stack-you-need-to-look-out`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/hotspawts-3") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-apps-can-increase-the-roi-of-your-business/undefinedmobile-apps-can-increase-the-roi-of-your-business") {
        return NextResponse.redirect(`${origin}/blog/mobile-apps-can-increase-the-roi-of-your-business`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-apps-can-increase-the-roi-of-your-business") {
        return NextResponse.redirect(`${origin}/blog/mobile-apps-can-increase-the-roi-of-your-business`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/official-atlanta-tech-village-app-coworking-space") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-get-sound") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/september-12-a-big-day-for-apple/undefinedseptember-12-a-big-day-for-apple") {
        return NextResponse.redirect(`${origin}/blog/september-12-a-big-day-for-apple`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-use-hashtags-effectively-in-social-media-optimization/undefinedhow-to-use-hashtags-effectively-in-social-media-optimization") {
        return NextResponse.redirect(`${origin}/blog/how-to-use-hashtags-effectively-in-social-media-optimization`, 301)
    }
    if (req.nextUrl.pathname === "/9-must-have-mobile-app-features-to-create-great-applications/undefined9-must-have-mobile-app-features-to-create-great-applications") {
        return NextResponse.redirect(`${origin}/blog/9-must-have-mobile-app-features-to-create-great-applications`, 301)
    }
    if (req.nextUrl.pathname === "/ecommerce-app-development-guide/undefinedecommerce-app-development-guide") {
        return NextResponse.redirect(`${origin}/blog/ecommerce-app-development-guide`, 301)
    }
    if (req.nextUrl.pathname === "/ecommerce-app-development-guide") {
        return NextResponse.redirect(`${origin}/blog/ecommerce-app-development-guide`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/imsafenow-2") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/2021/02") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/know-more-about-wireframes-mockups-and-prototypes/undefinedknow-more-about-wireframes-mockups-and-prototypes") {
        return NextResponse.redirect(`${origin}/blog/know-more-about-wireframes-mockups-and-prototypes`, 301)
    }
    if (req.nextUrl.pathname === "/how-mobile-apps-are-changing-the-way-of-doing-business/undefinedhow-mobile-apps-are-changing-the-way-of-doing-business") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/best-progressive-web-app-templates/undefinedbest-progressive-web-app-templates") {
        return NextResponse.redirect(`${origin}/blog/best-progressive-web-app-templates`, 301)
    }
    if (req.nextUrl.pathname === "/pwa-for-ecommerce-businesses/undefinedpwa-for-ecommerce-businesses") {
        return NextResponse.redirect(`${origin}/blog/pwa-for-ecommerce-businesses`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-understand-its-time-for-ux-ui-modernization/undefinedhow-to-understand-its-time-for-ux-ui-modernization") {
        return NextResponse.redirect(`${origin}/blog/how-to-understand-its-time-for-ux-ui-modernization`, 301)
    }
    if (req.nextUrl.pathname === "/important-things-to-consider-during-web-application-development/undefinedimportant-things-to-consider-during-web-application-development") {
        return NextResponse.redirect(`${origin}/blog/important-things-to-consider-during-web-application-development`, 301)
    }
    if (req.nextUrl.pathname === "/hire-android-app-developers/undefinedhire-android-app-developers") {
        return NextResponse.redirect(`${origin}/blog/`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/faithaid") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/the-app-store-optimization-process/undefinedthe-app-store-optimization-process") {
        return NextResponse.redirect(`${origin}/blog/the-app-store-optimization-process`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch/undefinedappzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch`, 301)
    }
    if (req.nextUrl.pathname === "/business-intelligence-what-it-is-and-the-benefits-appzoro/undefinedbusiness-intelligence-what-it-is-and-the-benefits-appzoro") {
        return NextResponse.redirect(`${origin}/blog/business-intelligence-what-it-is-and-the-benefits-appzoro`, 301)
    }
    if (req.nextUrl.pathname === "/business-intelligence-what-it-is-and-the-benefits-appzoro") {
        return NextResponse.redirect(`${origin}/blog/business-intelligence-what-it-is-and-the-benefits-appzoro`, 301)
    }
    if (req.nextUrl.pathname === "/new-upcoming-android-version-is-android-o/undefinednew-upcoming-android-version-is-android-o") {
        return NextResponse.redirect(`${origin}/blog/business-intelligence-what-it-is-and-the-benefits-appzoro`, 301)
    }
    if (req.nextUrl.pathname === "/7-reasons-why-adobe-xd-will-dominate-mobile-ui-design-in-2019-appzoro/undefined7-reasons-why-adobe-xd-will-dominate-mobile-ui-design-in-2019-appzoro") {
        return NextResponse.redirect(`${origin}/blog/business-intelligence-what-it-is-and-the-benefits-appzoro`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-balltalk") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/category/ipad") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/what-is-application-integration-and-how-does-it-work/undefinedwhat-is-application-integration-and-how-does-it-work") {
        return NextResponse.redirect(`${origin}/blog/what-is-application-integration-and-how-does-it-work`, 301)
    }
    if (req.nextUrl.pathname === "/best-website-monitoring-tools-and-services/undefinedbest-website-monitoring-tools-and-services") {
        return NextResponse.redirect(`${origin}/blog/best-website-monitoring-tools-and-services`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/guardian") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/how-much-does-it-cost-to-maintain-an-app/undefinedhow-much-does-it-cost-to-maintain-an-app") {
        return NextResponse.redirect(`${origin}/blog/how-much-does-it-cost-to-maintain-an-app`, 301)
    }
    if (req.nextUrl.pathname === "/category/mobile-apps") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/7-must-know-facts-about-mobile-app-development/undefined7-must-know-facts-about-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/7-must-know-facts-about-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-recognized-as-a-top-web-development-company-2021-by-techreviewer/undefinedappzoro-recognized-as-a-top-web-development-company-2021-by-techreviewer") {
        return NextResponse.redirect(`${origin}/blog/appzoro-recognized-as-a-top-web-development-company-2021-by-techreviewer`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-sitter-sanity") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/things-to-remember-while-searching-best-web-application-development-company/undefinedthings-to-remember-while-searching-best-web-application-development-company") {
        return NextResponse.redirect(`${origin}/blog/things-to-remember-while-searching-best-web-application-development-company`, 301)
    }
    if (req.nextUrl.pathname === "/know-more-about-kotlin/undefinedknow-more-about-kotlin") {
        return NextResponse.redirect(`${origin}/blog/know-more-about-kotlin`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-at-goodfirms/undefinedappzoro-technologies-at-goodfirms") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-at-goodfirms`, 301)
    }
    if (req.nextUrl.pathname === "/best-android-apps-where-you-can-sell-your-things/undefinedbest-android-apps-where-you-can-sell-your-things") {
        return NextResponse.redirect(`${origin}/blog/best-android-apps-where-you-can-sell-your-things`, 301)
    }
    if (req.nextUrl.pathname === "/whatsapp-adds-status-update-like-snapchat/undefinedwhatsapp-adds-status-update-like-snapchat") {
        return NextResponse.redirect(`${origin}/blog/whatsapp-adds-status-update-like-snapchat`, 301)
    }
    if (req.nextUrl.pathname === "/the-five-deadly-myths-of-mobile-app-development/undefinedthe-five-deadly-myths-of-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/the-five-deadly-myths-of-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/the-real-costs-of-building-a-mobile-app-for-ios-and-android/undefinedthe-real-costs-of-building-a-mobile-app-for-ios-and-android") {
        return NextResponse.redirect(`${origin}/blog/the-real-costs-of-building-a-mobile-app-for-ios-and-android`, 301)
    }
    if (req.nextUrl.pathname === "/the-real-costs-of-building-a-mobile-app-for-ios-and-android") {
        return NextResponse.redirect(`${origin}/blog/the-real-costs-of-building-a-mobile-app-for-ios-and-android`, 301)
    }
    if (req.nextUrl.pathname === "/category/video-post") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/pwa-development-cost-guide-that-saves-you-from-overpaying/undefinedpwa-development-cost-guide-that-saves-you-from-overpaying") {
        return NextResponse.redirect(`${origin}/blog/pwa-development-cost-guide-that-saves-you-from-overpaying`, 301)
    }
    if (req.nextUrl.pathname === "/tips-to-increase-your-app-reviews/undefinedtips-to-increase-your-app-reviews") {
        return NextResponse.redirect(`${origin}/blog/tips-to-increase-your-app-reviews`, 301)
    }
    if (req.nextUrl.pathname === "/android-vs-ios-app-development/undefinedandroid-vs-ios-app-development") {
        return NextResponse.redirect(`${origin}/blog/android-vs-ios-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/the-essential-mobile-app-development-checklist-by-appzoro/undefinedthe-essential-mobile-app-development-checklist-by-appzoro") {
        return NextResponse.redirect(`${origin}/blog/the-essential-mobile-app-development-checklist-by-appzoro`, 301)
    }
    if (req.nextUrl.pathname === "/choose-the-right-mobile-app-database/undefinedchoose-the-right-mobile-app-database") {
        return NextResponse.redirect(`${origin}/blog/choose-the-right-mobile-app-database`, 301)
    }
    if (req.nextUrl.pathname === "/best-free-ecommerce-website-builders/undefinedbest-free-ecommerce-website-builders") {
        return NextResponse.redirect(`${origin}/blog/best-free-ecommerce-website-builders`, 301)
    }
    if (req.nextUrl.pathname === "/best-android-libraries-to-use-in-2023/undefinedbest-android-libraries-to-use-in-2023") {
        return NextResponse.redirect(`${origin}/blog/best-android-libraries-to-use-in-2023`, 301)
    }
    if (req.nextUrl.pathname === "/2020/11") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/how-google-play-store-does-better-than-the-apple-app-store/undefinedhow-google-play-store-does-better-than-the-apple-app-store") {
        return NextResponse.redirect(`${origin}/blog/how-google-play-store-does-better-than-the-apple-app-store`, 301)
    }
    if (req.nextUrl.pathname === "/how-google-play-store-does-better-than-the-apple-app-store") {
        return NextResponse.redirect(`${origin}/blog/how-google-play-store-does-better-than-the-apple-app-store`, 301)
    }
    if (req.nextUrl.pathname === "/tag/android-mobile-app-development") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/android-app-development") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/author/appzoro") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/category/instagram") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/monetizing-app") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/category/fashion") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-balltalk") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-develop-stock-trading-app-guide/undefinedhow-to-develop-stock-trading-app-guide") {
        return NextResponse.redirect(`${origin}/blog/how-to-develop-stock-trading-app-guide`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/web-apps-apextexco") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/truck-your-way/undefinedportfolio/truck-your-way") {
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-named-a-top-atlanta-mobile-app-development-company-by-clutch/undefinedappzoro-technologies-named-a-top-atlanta-mobile-app-development-company-by-clutch") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/mobile-apps-company-atlanta-ga") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta/ios-apps/cowork-oasis") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-venu2go") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/web-apps-apextexco") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/kwik-3") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-cowork-oasis") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/web-apps-open-on-sunday") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-cigaremo") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-skoozi") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-chicago") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-chicago`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-cowork-oasis") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/imsafenow-2") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-cigaremo") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/city-of-milton") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Best_IDE_for_Android_App_Development_in_2024_6a55098484.webp") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-design-trends/undefinedmobile-app-design-trends") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-design-trends`, 301)
    }
    if (req.nextUrl.pathname === "/internet-of-things/undefinedinternet-of-things") {
        return NextResponse.redirect(`${origin}/blog/internet-of-things`, 301)
    }
    if (req.nextUrl.pathname === "/internet-of-things") {
        return NextResponse.redirect(`${origin}/blog/internet-of-things`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-venu2go") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/best-wysiwyg-html-web-editors/undefinedbest-wysiwyg-html-web-editors") {
        return NextResponse.redirect(`${origin}/blog/best-wysiwyg-html-web-editors`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Mobile_App_Security_Complete_Guide_e778074d75.webp") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-get-sound") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/create-an-effective-wireframe-that-will-simplify-your-design-process/undefinedcreate-an-effective-wireframe-that-will-simplify-your-design-process") {
        return NextResponse.redirect(`${origin}/blog/create-an-effective-wireframe-that-will-simplify-your-design-process`, 301)
    }
    if (req.nextUrl.pathname === "/ai-in-mobile-app-development/undefinedai-in-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/ai-in-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/truck-your-way-2") {
        return NextResponse.redirect(`${origin}/blog/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-trends-in-2017/undefinedmobile-app-development-trends-in-2017") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-trends-in-2017`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/uspace") {
        return NextResponse.redirect(`${origin}/locationsiphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-shareplay") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/9-things-you-need-to-know-before-building-an-app/undefined9-things-you-need-to-know-before-building-an-app") {
        return NextResponse.redirect(`${origin}/blog/9-things-you-need-to-know-before-building-an-app`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/web-app-built-x") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/kwik-2") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-miami") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-miami`, 301)
    }
    if (req.nextUrl.pathname === "/tips-of-choosing-software-development-company-for-startup-business/undefinedtips-of-choosing-software-development-company-for-startup-business") {
        return NextResponse.redirect(`${origin}/blog/tips-of-choosing-software-development-company-for-startup-business`, 301)
    }
    if (req.nextUrl.pathname === "/lawsuit-charging-apple-with-iphone-app-monopoly/undefinedlawsuit-charging-apple-with-iphone-app-monopoly") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/medium_Mobile_App_Security_Complete_Guide_e778074d75.webp") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/digital-marketing") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/hotspawts-2") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-hotelier") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/uspace") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-amc-n-me") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/ios-apps-balltalk") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/kwik-3") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/healthcare-app-development-guide/undefinedhealthcare-app-development-guide") {
        return NextResponse.redirect(`${origin}/blog/healthcare-app-development-guide`, 301)
    }
    if (req.nextUrl.pathname === "/apple-add-new-features-in-ios-10/undefinedapple-add-new-features-in-ios-10") {
        return NextResponse.redirect(`${origin}/blog/apple-add-new-features-in-ios-10`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/hotspawts-3") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/guardian-2") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/official-atlanta-tech-village-app-coworking-space") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/increase-your-business-roi-with-ios-app-development/undefinedincrease-your-business-roi-with-ios-app-development") {
        return NextResponse.redirect(`${origin}/blog/increase-your-business-roi-with-ios-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/steps-to-follow-for-converting-website-into-customize-mobile-application/undefinedsteps-to-follow-for-converting-website-into-customize-mobile-application") {
        return NextResponse.redirect(`${origin}/blog/steps-to-follow-for-converting-website-into-customize-mobile-application`, 301)
    }
    if (req.nextUrl.pathname === "/why-restaurants-need-mobile-apps/undefinedwhy-restaurants-need-mobile-apps") {
        return NextResponse.redirect(`${origin}/blog/why-restaurants-need-mobile-apps`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/city-of-milton-3") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-faithaid") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/native-vs-hybrid-which-type-of-development-should-you-choose/undefinednative-vs-hybrid-which-type-of-development-should-you-choose") {
        return NextResponse.redirect(`${origin}/blog/native-vs-hybrid-which-type-of-development-should-you-choose`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-hotelier") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/judicial-innovations-2") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/2017/12") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/is-android-or-ios-better") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/tag/android-vs-ios-development") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-named-a-top-atlanta-mobile-app-development-company-by-clutch//1000") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/tag/mobile-apps-development") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-element-closest.js") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/top-6-mistakes-app-entrepreneurs-make-during-app-development-and-marketing/undefinedtop-6-mistakes-app-entrepreneurs-make-during-app-development-and-marketing") {
        return NextResponse.redirect(`${origin}/blog/top-6-mistakes-app-entrepreneurs-make-during-app-development-and-marketing`, 301)
    }
    if (req.nextUrl.pathname === "/most-notable-differences-between-ios-and-android-while-creating/undefinedmost-notable-differences-between-ios-and-android-while-creating") {
        return NextResponse.redirect(`${origin}/blog/most-notable-differences-between-ios-and-android-while-creating`, 301)
    }
    if (req.nextUrl.pathname === "/future-iphone-may-use-customized-wireless-charging-system-made-in-partnership-with-broadcom/undefinedfuture-iphone-may-use-customized-wireless-charging-system-made-in-partnership-with-broadcom") {
        return NextResponse.redirect(`${origin}/blog/future-iphone-may-use-customized-wireless-charging-system-made-in-partnership-with-broadcom`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-design-in-2019-ui-game-changers/undefinedmobile-app-design-in-2019-ui-game-changers") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-design-in-2019-ui-game-changers`, 301)
    }
    if (req.nextUrl.pathname === "/framework-for-mobile-app-development-2021-2022//1000") {
        return NextResponse.redirect(`${origin}/blog/framework-for-mobile-app-development-2021-2022`, 301)
    }
    if (req.nextUrl.pathname === "/the-best-you-can-do-to-monetize-your-mobile-app/undefinedthe-best-you-can-do-to-monetize-your-mobile-app") {
        return NextResponse.redirect(`${origin}/blog/the-best-you-can-do-to-monetize-your-mobile-app`, 301)
    }
    if (req.nextUrl.pathname === "/whatsapp-is-now-open-for-businesses/undefinedwhatsapp-is-now-open-for-businesses") {
        return NextResponse.redirect(`${origin}/whatsapp-is-now-open-for-businesses`, 301)
    }
    if (req.nextUrl.pathname === "/category/android-applications") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-design-in-2019-ui-game-changers/feed") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-design-in-2019-ui-game-changers`, 301)
    }
    if (req.nextUrl.pathname === "/best-ide-for-android-development-of-2022//1000") {
        return NextResponse.redirect(`${origin}/blog/best-ide-for-android-development-of-2022`, 301)
    }
    if (req.nextUrl.pathname === "/10-mobile-app-development-trends-to-watch-out-in-2019/undefined10-mobile-app-development-trends-to-watch-out-in-2019") {
        return NextResponse.redirect(`${origin}/blog/10-mobile-app-development-trends-to-watch-out-in-2019`, 301)
    }
    if (req.nextUrl.pathname === "/7-reasons-why-adobe-xd-will-dominate-mobile-ui-design-in-2019-appzoro/feed") {
        return NextResponse.redirect(`${origin}/blog/7-reasons-why-adobe-xd-will-dominate-mobile-ui-design-in-2019-appzoro`, 301)
    }
    if (req.nextUrl.pathname === "/smartphone-technologies-to-consider-when-developing-an-app/undefinedsmartphone-technologies-to-consider-when-developing-an-app") {
        return NextResponse.redirect(`${origin}/blog/smartphone-technologies-to-consider-when-developing-an-app`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta/ios-apps/hotelier") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/blog/hire-android-app-developers") {
        return NextResponse.redirect(`${origin}/blog/hire-android-app-developers`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-cowork-oasis") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/ecommerce-app-development-cost/undefinedecommerce-app-development-cost") {
        return NextResponse.redirect(`${origin}/blog/ecommerce-app-development-cost`, 301)
    }
    if (req.nextUrl.pathname === "/tag/mobile-apps") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-skoozi") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/android-apps-get-sound") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/category/ios-apps") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/official-atlanta-tech-village-app-coworking-space") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-fitness-bank") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/truck-your-way-2") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/blog/why-small-businesses-are-") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-money-hungry") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-fugleam") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/web-apps-open-on-sunday") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/android-apps-amc-n-me") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/2020/03") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/category/iot") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta/copythat") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta/android-apps/money-hungry") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/category/ios-app-development") {
        return NextResponse.redirect(`${origin}/services/ios-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta/android-apps/uspace") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/category/enterprise") {
        return NextResponse.redirect(`${origin}/services/web-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-venu2go") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-cowork-oasis") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-london") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-london`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/city-of-milton-3") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/why-small-businesses-are-developing-mobile-apps/undefinedwhy-small-businesses-are-developing-mobile-apps") {
        return NextResponse.redirect(`${origin}/blog/why-small-businesses-are-developing-mobile-apps`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-develop-a-complete-bug-free-mobile-application/undefinedhow-to-develop-a-complete-bug-free-mobile-application") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-san-diego/ios-apps-balltalk") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-san-diego`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/uspace") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/copythat") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/web-apps-bobchats") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/city-of-milton-3") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-boston") {
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-boston`, 301)
    }
    if (req.nextUrl.pathname === "/best-php-development-") {
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/web-app-built-x") {
        return NextResponse.redirect(`${origin}/locations/iphone-app-development-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/software-development-trends-to-watch-out-for/undefinedsoftware-development-trends-to-watch-out-for") {
        return NextResponse.redirect(`${origin}/blog/software-development-trends-to-watch-out-for`, 301)
    }

    if (req.nextUrl.pathname === "/create-a-podcast-app-guide") {
        return NextResponse.redirect(`${origin}/blog/create-a-podcast-app-guide`, 301)
    }
    if (req.nextUrl.pathname === "/georgia-mobile-app-developers") {
        return NextResponse.redirect(`${origin}/locations/georgia-mobile-application-developers`, 301)
    }
    if (req.nextUrl.pathname === "/atlanta-app-developers") {
        return NextResponse.redirect(`${origin}/locations/atlanta-app-developers`, 301)
    }

    if (req.nextUrl.pathname === "/retail-ecommerce") {
        return NextResponse.redirect(`${origin}/industry/retail-ecommerce`, 301)
    }
    if (req.nextUrl.pathname === "/real-estate ") {
        return NextResponse.redirect(`${origin}/industry/real-estate`, 301)
    }
    if (req.nextUrl.pathname === "/healthcare-app-development") {
        return NextResponse.redirect(`${origin}/industry/healthcare-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/education-software-development") {
        return NextResponse.redirect(`${origin}/industry/education-software-development`, 301)
    }
    if (req.nextUrl.pathname === "/restaurant-food-delivery-applications") {
        return NextResponse.redirect(`${origin}/industry/restaurant-food-delivery-applications`, 301)
    }
    if (req.nextUrl.pathname === "/sports-app-development") {
        return NextResponse.redirect(`${origin}/industry/sports-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/travel-hospitality") {
        return NextResponse.redirect(`${origin}/industry/travel-hospitality`, 301)
    }
    if (req.nextUrl.pathname === "/financial-software-development") {
        return NextResponse.redirect(`${origin}/industry/financial-software-development`, 301)
    }
    if (req.nextUrl.pathname === "/social-networking-app-development") {
        return NextResponse.redirect(`${origin}/industry/social-networking-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/entertainment-app-development") {
        return NextResponse.redirect(`${origin}/industry/entertainment-app-development`, 301)
    }

    if (req.nextUrl.pathname === "/conference-and-events-app-development") {
        return NextResponse.redirect(`${origin}/industry/conference-and-events-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/logistics-app-development") {
        return NextResponse.redirect(`${origin}/industry/logistics-app-development`, 301)
    }

    // New Redirections

    if (req.nextUrl.pathname === "/?Male=walmart-viagra") {
        return NextResponse.redirect(`${origin}/`, 301)
    }
    if (req.nextUrl.pathname === "/?LOSS=diet-pill-infomercial") {
        return NextResponse.redirect(`${origin}/`, 301)
    }
    if (req.nextUrl.pathname === "/copythat") {
        return NextResponse.redirect(`${origin}/case-study/copythat`, 301)
    }
    if (req.nextUrl.pathname === "/how-mobile-apps-are-changing-the-way-of-doing-business") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/best-front-end-web-developments-tools") {
        return NextResponse.redirect(`${origin}/blog/best-front-end-web-developments-tools`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-understand-its-time-for-ux-ui-modernization") {
        return NextResponse.redirect(`${origin}/blog/how-to-understand-its-time-for-ux-ui-modernization`, 301)
    }
    if (req.nextUrl.pathname === "/react-native-development-company-california") {
        return NextResponse.redirect(`${origin}/technology/react-native`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-recognized-by-techreviewer-as-top-mobile-app-development-company") {
        return NextResponse.redirect(`${origin}/blog/appzoro-recognized-by-techreviewer-as-top-mobile-app-development-company`, 301)
    }
    if (req.nextUrl.pathname === "/is-mobile-app-development-worth-it-for-your-business") {
        return NextResponse.redirect(`${origin}/blog/is-mobile-app-development-worth-it-for-your-business`, 301)
    }
    if (req.nextUrl.pathname === "/kotlin-vs-java-which-one-is-better-for-android-applications") {
        return NextResponse.redirect(`${origin}/blog/kotlin-vs-java-which-one-is-better-for-android-applications`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-issues-warning-against-scam-site-appzoro-online") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-issues-warning-against-scam-site-appzoro-online`, 301)
    }
    if (req.nextUrl.pathname === "/top-7-tech-stack-you-need-to-look-out") {
        return NextResponse.redirect(`${origin}/blog/top-7-tech-stack-you-need-to-look-out`, 301)
    }
    if (req.nextUrl.pathname === "/ai-in-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/ai-in-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/android-vs-ios-app-development") {
        return NextResponse.redirect(`${origin}/blog/android-vs-ios-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/how-much-does-it-cost-to-maintain-an-app") {
        return NextResponse.redirect(`${origin}/blog/how-much-does-it-cost-to-maintain-an-app`, 301)
    }
    if (req.nextUrl.pathname === "/the-app-store-optimization-process") {
        return NextResponse.redirect(`${origin}/blog/the-app-store-optimization-process`, 301)
    }
    if (req.nextUrl.pathname === "/web-development-life-cycle") {
        return NextResponse.redirect(`${origin}/blog/web-development-life-cycle`, 301)
    }
    if (req.nextUrl.pathname === "/best-free-wireframe-tools-2023") {
        return NextResponse.redirect(`${origin}/blog/best-free-wireframe-tools-2023`, 301)
    }
    if (req.nextUrl.pathname === "/best-wysiwyg-html-web-editors") {
        return NextResponse.redirect(`${origin}/blog/best-wysiwyg-html-web-editors`, 301)
    }
    if (req.nextUrl.pathname === "/top-most-popular-websites") {
        return NextResponse.redirect(`${origin}/blog/top-most-popular-websites`, 301)
    }
    if (req.nextUrl.pathname === "/hiring-experienced-partner") {
        return NextResponse.redirect(`${origin}/blog/hiring-experienced-partner`, 301)
    }
    if (req.nextUrl.pathname === "/best-back-end-web-development-tools") {
        return NextResponse.redirect(`${origin}/blog/best-back-end-web-development-tools`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps") {
        return NextResponse.redirect(`${origin}/blog/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-approaches") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-approaches`, 301)
    }
    if (req.nextUrl.pathname === "/best-prototyping-tools") {
        return NextResponse.redirect(`${origin}/blog/best-prototyping-tools`, 301)
    }
    if (req.nextUrl.pathname === "/pwa-for-ecommerce-businesses") {
        return NextResponse.redirect(`${origin}/blog/pwa-for-ecommerce-businesses`, 301)
    }
    if (req.nextUrl.pathname === "/how-long-does-it-take-to-develop-a-mobile-app") {
        return NextResponse.redirect(`${origin}/blog/how-long-does-it-take-to-develop-a-mobile-app`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-develop-a-complete-bug-free-mobile-application") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/the-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting") {
        return NextResponse.redirect(`${origin}/blog/the-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting`, 301)
    }
    if (req.nextUrl.pathname === "/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how") {
        return NextResponse.redirect(`${origin}/blog/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how`, 301)
    }
    if (req.nextUrl.pathname === "/best-web-development-tools-free-paid") {
        return NextResponse.redirect(`${origin}/blog/best-web-development-tools-free-paid`, 301)
    }
    if (req.nextUrl.pathname === "/programming-languages-for-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/programming-languages-for-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/future-iphone-may-use-customized-wireless-charging-system-made-in-partnership-with-broadcom") {
        return NextResponse.redirect(`${origin}/blog/future-iphone-may-use-customized-wireless-charging-system-made-in-partnership-with-broadcom`, 301)
    }
    if (req.nextUrl.pathname === "/7-reasons-why-you-should-use-react-js-for-web-development") {
        return NextResponse.redirect(`${origin}/blog/7-reasons-why-you-should-use-react-js-for-web-development`, 301)
    }
    if (req.nextUrl.pathname === "/how-a-mobile-app-can-enhance-your-bottomline") {
        return NextResponse.redirect(`${origin}/blog/how-a-mobile-app-can-enhance-your-bottomline`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-process") {
        return NextResponse.redirect(`${origin}/blog/mobile-app-development-process`, 301)
    }
    if (req.nextUrl.pathname === "/iot-applications-the-use-of-iot-for-education-system") {
        return NextResponse.redirect(`${origin}/blog/iot-applications-the-use-of-iot-for-education-system`, 301)
    }
    if (req.nextUrl.pathname === "/details-about-property-management-software-and-what-is-the-cost-of-the-app") {
        return NextResponse.redirect(`${origin}/blog/details-about-property-management-software-and-what-is-the-cost-of-the-app`, 301)
    }
    if (req.nextUrl.pathname === "/best-web-design-software") {
        return NextResponse.redirect(`${origin}/blog/best-web-design-software`, 301)
    }
    if (req.nextUrl.pathname === "/modern-mobile-app-development-cutting-edge-trends-you-should-not-miss") {
        return NextResponse.redirect(`${origin}/blog/modern-mobile-app-development-cutting-edge-trends-you-should-not-miss`, 301)
    }
    if (req.nextUrl.pathname === "/the-top-5-trends-in-mobile-app-development") {
        return NextResponse.redirect(`${origin}/blog/the-top-5-trends-in-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/healthcare-app-development-guide") {
        return NextResponse.redirect(`${origin}/blog/healthcare-app-development-guide`, 301)
    }
    if (req.nextUrl.pathname === "/lawsuit-charging-apple-with-iphone-app-monopoly") {
        return NextResponse.redirect(`${origin}/blog/lawsuit-charging-apple-with-iphone-app-monopoly`, 301)
    }
    if (req.nextUrl.pathname === "/7-tips-for-a-successful-mobile-app-launch") {
        return NextResponse.redirect(`${origin}/blog/7-tips-for-a-successful-mobile-app-launch`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-application-testing") {
        return NextResponse.redirect(`${origin}/blog/mobile-application-testing`, 301)
    }
    if (req.nextUrl.pathname === "/blog-why-should-you-hire-appzoro-technology-for-android-app-development") {
        return NextResponse.redirect(`${origin}/blog/blog-why-should-you-hire-appzoro-technology-for-android-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/locations/app-development-company-atlanta") {
        return NextResponse.redirect(`${origin}/locations/atlanta-app-developers`, 301)
    }
    if (req.nextUrl.pathname === "/best-php-development-tools") { 
        return NextResponse.redirect(`${origin}/blog/best-php-development-tools`, 301) 
    }
    if (req.nextUrl.pathname === "/top-9-benefits-of-custom-mobile-application-development") { 
        return NextResponse.redirect(`${origin}/blog/top-9-benefits-of-custom-mobile-application-development`, 301) 
    }
    if (req.nextUrl.pathname === "/framework-for-mobile-app-development-2021-2022") { 
        return NextResponse.redirect(`${origin}/blog/framework-for-mobile-app-development-2021-2022`, 301) 
    }
    if (req.nextUrl.pathname === "/best-ide-for-android-development-of-2022") { 
        return NextResponse.redirect(`${origin}/blog/best-ide-for-android-development-of-2022`, 301) 
    }
    if (req.nextUrl.pathname === "/10-best-phone-location-tracking-apps-without-permission") { 
        return NextResponse.redirect(`${origin}/blog/10-best-phone-location-tracking-apps-without-permission`, 301) 
    }
    if (req.nextUrl.pathname === "/how-iot-is-helpful-to-success-in-e-scooter-app-development/") { 
        return NextResponse.redirect(`${origin}/blog/how-iot-is-helpful-to-success-in-e-scooter-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/how-many-people-does-it-take-to-develop-a-mobile-app/") { 
        return NextResponse.redirect(`${origin}/blog/how-many-people-does-it-take-to-develop-a-mobile-app`, 301) 
    }
    if (req.nextUrl.pathname === "/host-an-app-to-google-play-store") { 
        return NextResponse.redirect(`${origin}/blog/host-an-app-to-google-play-store`, 301) 
    }
    if (req.nextUrl.pathname === "/important-things-to-consider-during-web-application-development") { 
        return NextResponse.redirect(`${origin}/blog/important-things-to-consider-during-web-application-development`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/[slug]") { 
        return NextResponse.redirect(`${origin}/case-study`, 301) 
    }
    if (req.nextUrl.pathname === "/locations/undefinedlocations/atlanta-app-developers") { 
        return NextResponse.redirect(`${origin}/locations/atlanta-app-developers`, 301) 
    }
    if (req.nextUrl.pathname === "/best-progressive-web-app-templates") { 
        return NextResponse.redirect(`${origin}/blog/best-progressive-web-app-templates`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/city-of-milton") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/guardian") { 
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development`, 301) 
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch/") { 
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-featured-in-top-app-developers-in-georgia-by-clutch`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/guardian") { 
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development`, 301) 
    }

    if (req.nextUrl.pathname === "/locations/georgia-mobile-application-developers") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-georgia`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/framework-for-mobile-app-development-2021-2022") { 
        return NextResponse.redirect(`${origin}/blog/framework-for-mobile-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/top-9-benefits-of-custom-mobile-application-development") { 
        return NextResponse.redirect(`${origin}/blog/top-9-benefits-of-mobile-app-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/tips-of-choosing-software-development-company-for-startup-business") { 
        return NextResponse.redirect(`${origin}/blog/tips-for-choosing-custom-software-development-solutions-for-business`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/best-prototyping-tools") { 
        return NextResponse.redirect(`${origin}/blog/best-prototyping-tools-for-ui-ux-design-services`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/game-changer-app-development-company-clutch") { 
        return NextResponse.redirect(`${origin}/blog/appzoro-impact-on-clutch`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/georgia-library-service") { 
        return NextResponse.redirect(`${origin}/case-study/library-management-software`, 301) 
    }

    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/vinwiki") { 
        return NextResponse.redirect(`${origin}/case-study/vinwiki`, 301) 
    }
    if (req.nextUrl.pathname === "/ide-for-web-development-project-in-2022/") { 
        return NextResponse.redirect(`${origin}/blog/ide-for-web-development-project-in-2022`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/built-x") { 
        return NextResponse.redirect(`${origin}/case-study/built-x`, 301) 
    }
    if (req.nextUrl.pathname === "/technology/undefinedtechnology/react") { 
        return NextResponse.redirect(`${origin}/technology/react`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/fugleam") { 
        return NextResponse.redirect(`${origin}/case-study/fugleam`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/cigaremo") { 
        return NextResponse.redirect(`${origin}/case-study/cigaremo`, 301) 
    }
    if (req.nextUrl.pathname === "/how-to-develop-stock-trading-app-guide") { 
        return NextResponse.redirect(`${origin}/blog/how-to-develop-stock-trading-app-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/medium_Best_IDE_for_Android_App_Development_in_2024_6a55098484.webp") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/small_Best_IDE_for_Android_App_Development_in_2024_6a55098484.webp") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-san-diego/truck-your-way") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-diego`, 301) 
    }
    if (req.nextUrl.pathname === "/undefinedlocations") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-team-structure") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/flutter-app-development-pros-and-cons") { 
        return NextResponse.redirect(`${origin}/blog/flutter-app-development-pros-and-cons`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/judicial-innovations") { 
        return NextResponse.redirect(`${origin}/case-study/online-dispute-resolution-platform`, 301) 
    }
    if (req.nextUrl.pathname === "/services/undefinedservices/cross-platform-app-development") { 
        return NextResponse.redirect(`${origin}/services/cross-platform-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/locations/undefinedlocations/undefined") { 
        return NextResponse.redirect(`${origin}/locations`, 301) 
    }
    if (req.nextUrl.pathname === "/industry/undefinedindustry/conference-and-events-app-development") { 
        return NextResponse.redirect(`${origin}/industry/conference-and-events-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-security-complete-guide") { 
        return NextResponse.redirect(`${origin}/blog/mobile-app-security-complete-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/undefined/terms") { 
        return NextResponse.redirect(`${origin}/terms`, 301) 
    }
    if (req.nextUrl.pathname === "/blog-list/undefinedblog-list") { 
        return NextResponse.redirect(`${origin}/blog`, 301) 
    }
    if (req.nextUrl.pathname === "/our-work/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/industry/undefined/industry/social-networking-app-development") { 
        return NextResponse.redirect(`${origin}/industry/social-networking-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/framework-for-mobile-app-development-2021-2022/undefinedframework-for-mobile-app-development-2021-2022/") { 
        return NextResponse.redirect(`${origin}/blog/framework-for-mobile-app-development-2021-2022`, 301) 
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-named-a-top-atlanta-mobile-app-development-company-by-clutch//1000") { 
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-named-a-top-atlanta-mobile-app-development-company-by-clutch`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/know-more-about-kotlin/feed/") { 
        return NextResponse.redirect(`${origin}/blog/know-more-about-kotlin`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-element-closest.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-dom-rect.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-url.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-formdata.min.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/how-many-people-does-it-take-to-develop-a-mobile-app//1000") { 
        return NextResponse.redirect(`${origin}/blog/how-many-people-does-it-take-to-develop-a-mobile-app`, 301) 
    }
    if (req.nextUrl.pathname === "/iot-applications-the-use-of-iot-for-education-system//1000") { 
        return NextResponse.redirect(`${origin}/blog/iot-applications-the-use-of-iot-for-education-system`, 301) 
    }
    if (req.nextUrl.pathname === "/whatsapp-is-now-open-for-businesses/undefinedwhatsapp-is-now-open-for-businesses/") { 
        return NextResponse.redirect(`${origin}/blog/whatsapp-is-now-open-for-businesses`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps//1000") { 
        return NextResponse.redirect(`${origin}/blog/mobile-apps-testing-tools-and-techniques-how-to-test-native-vs-web-vs-hybrid-apps`, 301) 
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/android-apps-cigaremo") { 
        return NextResponse.redirect(`${origin}/locations/iphone-app-developer-denver`, 301) 
    }
    if (req.nextUrl.pathname === "/tag/web-application-development-atlanta/") { 
        return NextResponse.redirect(`${origin}/locations/atlanta-web-development`, 301) 
    }
    if (req.nextUrl.pathname === "/category/mobile-application-design/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-object-fit.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-node-contains.min.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/services/mobile-development/mobile-app-development/") { 
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-node-contains.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/wp-includes/js/dist/vendor/wp-polyfill-fetch.min.js") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/locations/atlanta-app-developers") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/how-many-people-does-it-take-to-develop-a-mobile-app/") {
        return NextResponse.redirect(`${origin}/blog/how-many-people-does-it-take-to-develop-a-mobile-app`, 301)
    }
    if (req.nextUrl.pathname === "/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta") {
        return NextResponse.redirect(`${origin}/blog/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta/`, 301)
    }
    if (req.nextUrl.pathname === "/manifest-recognizes-appzoro-as-most-reviewed-app-development-company-2022/") {
        return NextResponse.redirect(`${origin}/blog/manifest-recognizes-appzoro-as-most-reviewed-app-development-company-2022/`, 301)
    }
    if (req.nextUrl.pathname === "/why-restaurants-need-mobile-apps/") {
        return NextResponse.redirect(`${origin}/blog/why-restaurants-need-mobile-apps`, 301)
    }
    if (req.nextUrl.pathname === "/smartphone-technologies-to-consider-when-developing-an-app") {
        return NextResponse.redirect(`${origin}/blog/smartphone-technologies-to-consider-when-developing-an-app`, 301)
    }
    if (req.nextUrl.pathname === "/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/") {
        return NextResponse.redirect(`${origin}/blog/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how`, 301)
    }
    if (req.nextUrl.pathname === "/ai-in-mobile-app-development/") {
        return NextResponse.redirect(`${origin}/blog/ai-in-mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/judicial-innovations") {
        return NextResponse.redirect(`${origin}/case-study/online-dispute-resolution-platform`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-at-goodfirms") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-at-goodfirms`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-at-goodfirms/") {
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-at-goodfirms`, 301)
    }
    if (req.nextUrl.pathname === "/hiring-experienced-partner/undefinedhiring-experienced-partner/") {
        return NextResponse.redirect(`${origin}/blog/hiring-experienced-partner`, 301)
    }
    if (req.nextUrl.pathname === "/blog/know-more-about-kotlin/feed/") {
        return NextResponse.redirect(`${origin}/blog/know-more-about-kotlin`, 301)
    }
    if (req.nextUrl.pathname === "/whatsapp-is-now-open-for-businesses/undefinedwhatsapp-is-now-open-for-businesses/") {
        return NextResponse.redirect(`${origin}/blog/whatsapp-is-now-open-for-businesses`, 301)
    }
    // if (req.nextUrl.pathname === "/mobile-and-software-development-services") {
    //     return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301)
    // }
    if (req.nextUrl.pathname === "/portfolio") {
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/judicial-innovations") { 
        return NextResponse.redirect(`${origin}/case-study/online-dispute-resolution-platform`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/dreambook") { 
        return NextResponse.redirect(`${origin}/case-study/dreambook`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/jax") { 
        return NextResponse.redirect(`${origin}/case-study/car-rental-fleet-management-software`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/official-atlanta-tech-village-app-coworking-space/") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-coworking-space/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/imsafenow/") { 
        return NextResponse.redirect(`${origin}/case-study/imsafenow/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/city-of-milton/") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/copythat/") { 
        return NextResponse.redirect(`${origin}/case-study/copythat/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/webapp-spa-space/") { 
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/joseline/") { 
        return NextResponse.redirect(`${origin}/case-study/joseline/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/apex-textile-company/") { 
        return NextResponse.redirect(`${origin}/case-study/apex-textile-company/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/guardian/") { 
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/cigaremo/") { 
        return NextResponse.redirect(`${origin}/case-study/cigaremo/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/beverage-solutions-group/") { 
        return NextResponse.redirect(`${origin}/case-study/beverage-solutions-group/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/cowork-oasis/") { 
        return NextResponse.redirect(`${origin}/case-study/cowork-oasis/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/fitness-bank/") { 
        return NextResponse.redirect(`${origin}/case-study/fitness-bank/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/turns-financing/") { 
        return NextResponse.redirect(`${origin}/case-study/turns-financing/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/faithaid/") { 
        return NextResponse.redirect(`${origin}/case-study/faithaid/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/get-sound/") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/hotspawts/") { 
        return NextResponse.redirect(`${origin}/case-study/hotspawts/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/balltalk/") { 
        return NextResponse.redirect(`${origin}/case-study/balltalk/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/amc-n-me/") { 
        return NextResponse.redirect(`${origin}/case-study/amc-n-me/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/kwik/") { 
        return NextResponse.redirect(`${origin}/case-study/kwik/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/money-hungry/") { 
        return NextResponse.redirect(`${origin}/case-study/money-hungry/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/open-on-sunday/") { 
        return NextResponse.redirect(`${origin}/case-study/open-on-sunday/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/radio-trax") { 
        return NextResponse.redirect(`${origin}/case-study/radio-trax`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/shareplay/") { 
        return NextResponse.redirect(`${origin}/case-study/shareplay/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/sitter-sanity/") { 
        return NextResponse.redirect(`${origin}/case-study/sitter-sanity/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/the-hoteliers-network/") { 
        return NextResponse.redirect(`${origin}/case-study/the-hoteliers-network/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/fugleam/") { 
        return NextResponse.redirect(`${origin}/case-study/fugleam/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/uspace/") { 
        return NextResponse.redirect(`${origin}/case-study/uspace/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/ven-u2-go/") { 
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/vinwiki/") { 
        return NextResponse.redirect(`${origin}/case-study/vinwiki/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/built-x/") { 
        return NextResponse.redirect(`${origin}/case-study/built-x/`, 301) 
    }
    
    if (req.nextUrl.pathname === "/portfolio/sara-hospitality/") { 
        return NextResponse.redirect(`${origin}/case-study/sara-hospitality/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/gls-georgia-library-service") { 
        return NextResponse.redirect(`${origin}/case-study/gls-georgia-library-service`, 301) 
    }


    if (req.nextUrl.pathname === "/portfolio/polisci/") { 
        return NextResponse.redirect(`${origin}/case-study/polisci/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/built-x") { 
        return NextResponse.redirect(`${origin}/case-study/built-x`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/vinwiki") { 
        return NextResponse.redirect(`${origin}/case-study/vinwiki`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/ven-u2-go") { 
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/uspace") { 
        return NextResponse.redirect(`${origin}/case-study/uspace`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/fugleam") { 
        return NextResponse.redirect(`${origin}/case-study/fugleam`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/the-hoteliers-network") { 
        return NextResponse.redirect(`${origin}/case-study/the-hoteliers-network`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/skoozi") { 
        return NextResponse.redirect(`${origin}/case-study/skoozi`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/sitter-sanity") { 
        return NextResponse.redirect(`${origin}/case-study/sitter-sanity`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/shareplay") { 
        return NextResponse.redirect(`${origin}/case-study/shareplay`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/open-on-sunday") { 
        return NextResponse.redirect(`${origin}/case-study/open-on-sunday`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/money-hungry") { 
        return NextResponse.redirect(`${origin}/case-study/money-hungry`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/kwik") { 
        return NextResponse.redirect(`${origin}/case-study/kwik`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/amc-n-me") { 
        return NextResponse.redirect(`${origin}/case-study/amc-n-me`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/balltalk") { 
        return NextResponse.redirect(`${origin}/case-study/balltalk`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/hotspawts") { 
        return NextResponse.redirect(`${origin}/case-study/hotspawts`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/get-sound") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/medcraze") { 
        return NextResponse.redirect(`${origin}/case-study/medcraze/`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/official-atlanta-tech-village-app-coworking-space") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-coworking-space`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/imsafenow") { 
        return NextResponse.redirect(`${origin}/case-study/imsafenow`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/city-of-milton") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/copythat") { 
        return NextResponse.redirect(`${origin}/case-study/copythat`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/webapp-spa-space") { 
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/joseline") { 
        return NextResponse.redirect(`${origin}/case-study/joseline`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/apex-textile-company") { 
        return NextResponse.redirect(`${origin}/case-study/apex-textile-company`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/guardian") { 
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/cigaremo") { 
        return NextResponse.redirect(`${origin}/case-study/cigaremo`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/beverage-solutions-group") { 
        return NextResponse.redirect(`${origin}/case-study/beverage-solutions-group`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/cowork-oasis") { 
        return NextResponse.redirect(`${origin}/case-study/cowork-oasis`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/fitness-bank") { 
        return NextResponse.redirect(`${origin}/case-study/fitness-bank`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/turns-financing") { 
        return NextResponse.redirect(`${origin}/case-study/turns-financing`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/faithaid") { 
        return NextResponse.redirect(`${origin}/case-study/faithaid`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/credit-diy") { 
        return NextResponse.redirect(`${origin}/case-study/credit-diy`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/vumi") { 
        return NextResponse.redirect(`${origin}/case-study/vumi-social-network`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/vumi") { 
        return NextResponse.redirect(`${origin}/case-study/vumi-social-network`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/convoy") { 
        return NextResponse.redirect(`${origin}/case-study/convoy-transports`, 301) 
    }
    if (req.nextUrl.pathname === "/our-work") { 
        return NextResponse.redirect(`${origin}/case-study`, 301) 
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta") { 
        return NextResponse.redirect(`${origin}/`, 301) 
    }
    if (req.nextUrl.pathname === "/how-iot-is-helpful-to-success-in-e-scooter-app-development") { 
        return NextResponse.redirect(`${origin}/blog/how-iot-is-helpful-to-success-in-e-scooter-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/what-is-cms-and-how-to-choose-a-content-management-system-for-your-business-needs") { 
        return NextResponse.redirect(`${origin}/blog/what-is-cms-and-how-to-choose-a-content-management-system-for-your-business-needs`, 301) 
    }
    if (req.nextUrl.pathname === "/how-many-people-does-it-take-to-develop-a-mobile-app") { 
        return NextResponse.redirect(`${origin}/blog/how-many-people-does-it-take-to-develop-a-mobile-app`, 301) 
    }
    if (req.nextUrl.pathname === "/increase-your-business-roi-with-ios-app-development") { 
        return NextResponse.redirect(`${origin}/blog/increase-your-business-roi-with-ios-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/jax") { 
        return NextResponse.redirect(`${origin}/case-study/car-rental-fleet-management-software`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/spa-space") { 
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_4047f0b9c3.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_cfc5ba2860.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_1452a8c236.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_8a25d1c0cb.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Ed_Bolian_Vinviki_69ea853213_2467785be1.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_5483b3d44a.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_ATV_5_ca360d516a_f14e06a0ef.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_6fed386f06.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/589bcd8b56874_018736033a.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_589bcd8b56874_018736033a.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_aab7942b1a.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Elliot_Hayes_Open_on_Sunday_62ef2442d6_2215538118.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_41dfd21422.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_1452a8c236.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_589bcd8b56874_018736033a.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Connor_Burns_Hot_Spawts_4d7c0d2211_a0eacd546c.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Casey_Money_Hungry_a809993fc1_b5650717d3.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Thad_Joseph_Turns_Financing_b8a347dbbd_aaadfc0697.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Josh_Chamberlain_Sitter_Sanity_6fedb1422d_b69c3dcca3.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_ba387de80e_69b3ef2200.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Challenges_6dec605cd0_ba387de80e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Paawan_Mathur_70x70_b69c58a667_fbe03a7e7b.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_7c6d3ceca9.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_c0176401b4.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_8a25d1c0cb.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_ed08c840e8.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Challenges_6dec605cd0_ba387de80e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/internet-of-things") { 
        return NextResponse.redirect(`${origin}/blog/internet-of-things`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_solutions_graphic_ca43dc840d_0878f2a146.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Gurdian_1_c384477a57_77d576fddf.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Medcraze_5_9c0bf4ba1a_3f28b3dbcd.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Gurdian_2_712e05275a_1_79341cdfdd.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/TYW_3_1e51845b0a_5c0915ba73.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/1624989129546_5f20b825ac_088278bc27.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Capture123_60085f255f_57e6da0142.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Capture123_60085f255f_57e6da0142.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Capture123_60085f255f_57e6da0142.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/android-apps-cigaremo") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/georgia-library-service") { 
        return NextResponse.redirect(`${origin}/case-study/cigaremo`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/convoy-transports") { 
        return NextResponse.redirect(`${origin}/case-study/convoy-transports`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/ATV_3_9f08b979a4_a83e80a91e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/ATV_4_bcaefe7ab0_6096fd3e3c.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/spa-space") { 
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Gurdian_2_712e05275a_ba1346907e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_TYW_3_1e51845b0a_5c0915ba73.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/ATV_5_ca360d516a_f14e06a0ef.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/ATV_1_7daa69a532_04c919f719.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Im_Safe_Now_1_b465365918_6b13e060af.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_TYW_3_1e51845b0a_5c0915ba73.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Gurdian_2_712e05275a_1_79341cdfdd.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_ATV_4_bcaefe7ab0_6096fd3e3c.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Gurdian_1_c384477a57_77d576fddf.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_ATV_3_9f08b979a4_a83e80a91e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Im_Safe_Now_1_b465365918_6b13e060af.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_ATV_5_ca360d516a_f14e06a0ef.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_ATV_1_7daa69a532_04c919f719.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Medcraze_5_9c0bf4ba1a_3f28b3dbcd.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Im_Safe_Now_1_b465365918_6b13e060af.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Medcraze_5_9c0bf4ba1a_3f28b3dbcd.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Gurdian_2_712e05275a_ba1346907e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_ATV_1_7daa69a532_04c919f719.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_ATV_3_9f08b979a4_a83e80a91e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_ATV_4_bcaefe7ab0_6096fd3e3c.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Gurdian_2_712e05275a_ba1346907e.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Gurdian_2_712e05275a_1_79341cdfdd.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Gurdian_1_c384477a57_77d576fddf.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_problem_graphic_0290dc34ce_5a683d0d58.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/problem_graphic_0290dc34ce_5a683d0d58.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Copythat_1_51c5de4d44_0b2ea402af.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Copythat_1_51c5de4d44_0b2ea402af.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_chellanges_graphic_f723408135_99dc88cc71.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Copythat_1_51c5de4d44_0b2ea402af.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Copythat_2_20156bcfb1_5b1e07dc2d.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Copy_That_back_981be0bb49_6853f36e27.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Copythat_2_20156bcfb1_5b1e07dc2d.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Copy_That_back_981be0bb49_6853f36e27.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Copythat_2_20156bcfb1_5b1e07dc2d.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Copy_That_back_981be0bb49_6853f36e27.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/chellanges_graphic_f723408135_99dc88cc71.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_chellanges_graphic_f723408135_99dc88cc71.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_solutions_graphic_ca43dc840d_0878f2a146.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/solutions_graphic_ca43dc840d_0878f2a146.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_problem_graphic_0290dc34ce_5a683d0d58.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_gls_2_c6200f7588_fae89201c7.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_gina_martin_review_on_clutch_85f3b1be44_1d939a61bf.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_gls_2_c6200f7588_fae89201c7.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Jax_Screenshot_2023_05_23_220857_b895e88667_4548fd64a0.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/gls_1_480fc200c0_7449ad4a42.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/gina_martin_review_on_clutch_85f3b1be44_1d939a61bf.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_gls_1_480fc200c0_7449ad4a42.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_gina_martin_review_on_clutch_85f3b1be44_1d939a61bf.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/gls_2_c6200f7588_fae89201c7.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_gls_1_480fc200c0_7449ad4a42.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_1647890460779_f410dc2856_7ebe278967.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta") { 
        return NextResponse.redirect(`${origin}/blog/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Most_popular_web_development_frameworks_eecfa87c8d.jpg") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Most_popular_web_development_frameworks_eecfa87c8d.jpg") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Most_popular_web_development_frameworks_eecfa87c8d.jpg") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/medium_Most_popular_web_development_frameworks_eecfa87c8d.jpg") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/1647890460779_f410dc2856_7ebe278967.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Jax_Screenshot_2023_05_23_220857_b895e88667_4548fd64a0.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/manifest-recognizes-appzoro-as-most-reviewed-app-development-company-2022/") { 
        return NextResponse.redirect(`${origin}/blog/manifest-recognizes-appzoro-as-most-reviewed-app-development-company-2022`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Jax_Screenshot_2023_05_23_220857_b895e88667_4548fd64a0.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/our-work/official-atlanta-tech-village-app-coworking-space/") { 
        return NextResponse.redirect(`${origin}/blog/our-work/official-atlanta-tech-village-app-coworking-space/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/faithaid") { 
        return NextResponse.redirect(`${origin}/case-study/faithaid`, 301)
    }
    if (req.nextUrl.pathname === "/smartphone-technologies-to-consider-when-developing-an-app") { 
        return NextResponse.redirect(`${origin}/blog/smartphone-technologies-to-consider-when-developing-an-app`, 301)
    }
    if (req.nextUrl.pathname === "/test-strapi-content") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/copythat") { 
        return NextResponse.redirect(`${origin}/case-study/copythat`, 301)
    }
    if (req.nextUrl.pathname === "/android-apps-vinwiki") { 
        return NextResponse.redirect(`${origin}/case-study/vinwiki`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/get-sound") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound`, 301)
    }
    if (req.nextUrl.pathname === "/technology/undefinedtechnology/java") { 
        return NextResponse.redirect(`${origin}/technology/java`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-miami/truck-your-way-2") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/locations/undefinedlocations/flutter-app-development") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/skoozi") { 
        return NextResponse.redirect(`${origin}/case-study/skoozi`, 301)
    }
    if (req.nextUrl.pathname === "/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/") { 
        return NextResponse.redirect(`${origin}/blog/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/`, 301)
    }
    if (req.nextUrl.pathname === "/ai-in-mobile-app-development/") { 
        return NextResponse.redirect(`${origin}/blog/ai-in-mobile-app-development/`, 301)
    }
    if (req.nextUrl.pathname === "/our-work/") { 
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/7-most-popular-web-frameworks-for-development-in-2021") { 
        return NextResponse.redirect(`${origin}/blog/7-most-popular-web-frameworks-for-development-in-2021/`, 301)
    }
    if (req.nextUrl.pathname === "/web-apps-apextexco") { 
        return NextResponse.redirect(`${origin}/case-study/apex-textile-company`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/uspace") { 
        return NextResponse.redirect(`${origin}/case-study/uspace`, 301)
    }
    if (req.nextUrl.pathname === "/locations/undefinedlocations/app-development-company-atlanta") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/imsafenow") { 
        return NextResponse.redirect(`${origin}/case-study/imsafenow`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-los-angeles/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/the-real-costs-of-building-a-mobile-app-for-ios-and-android") { 
        return NextResponse.redirect(`${origin}/blog/the-real-costs-of-building-a-mobile-app-for-ios-and-android`, 301)
    }
    if (req.nextUrl.pathname === "/our-work/official-atlanta-tech-village-app-coworking-space") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301)
    }
    if (req.nextUrl.pathname === "/industry/undefinedindustry/real-estate") { 
        return NextResponse.redirect(`${origin}/industry/real-estate`, 301)
    }
    if (req.nextUrl.pathname === "/industry/undefinedindustry/sports-app-development") { 
        return NextResponse.redirect(`${origin}/industry/sports-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-miami/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/services/undefinedservices/mobile-app-development") { 
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/services/undefinedservices/web-app-development") { 
        return NextResponse.redirect(`${origin}/services/web-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/joseline") { 
        return NextResponse.redirect(`${origin}/case-study/joseline`, 301)
    }
    if (req.nextUrl.pathname === "/undefined/team") { 
        return NextResponse.redirect(`${origin}/team`, 301)
    }
    if (req.nextUrl.pathname === "/ios-apps-balltalk") { 
        return NextResponse.redirect(`${origin}/case-study/balltalk`, 301)
    }
    if (req.nextUrl.pathname === "/services/undefinedservices/ui-ux-design-services") { 
        return NextResponse.redirect(`${origin}/services/ui-ux-design-services`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/jax") { 
        return NextResponse.redirect(`${origin}/case-study/car-rental-fleet-management-software`, 301)
    }
    if (req.nextUrl.pathname === "/industry/undefinedindustry/healthcare-app-development") { 
        return NextResponse.redirect(`${origin}/industry/healthcare-app-development`, 301)
    }
    if (req.nextUrl.pathname === "/joseline-2/") { 
        return NextResponse.redirect(`${origin}/case-study/joseline`, 301)
    }
    if (req.nextUrl.pathname === "/undefined/") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/shareplay/undefinedportfolio/shareplay/") { 
        return NextResponse.redirect(`${origin}/case-study/shareplay`, 301)
    }
    if (req.nextUrl.pathname === "/undefined/contact-us") { 
        return NextResponse.redirect(`${origin}/contact-us`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-at-goodfirms/") { 
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-at-goodfirms/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/skoozi/undefinedportfolio/skoozi/") { 
        return NextResponse.redirect(`${origin}/case-study/skoozi`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/copythat/undefinedportfolio/copythat/") { 
        return NextResponse.redirect(`${origin}/case-study/copythat`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/medcraze") { 
        return NextResponse.redirect(`${origin}/case-study/medcraze`, 301)
    }
    if (req.nextUrl.pathname === "/truck-your-way-2/") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/our-work/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/city-of-milton/undefinedportfolio/city-of-milton/") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/sitter-sanity/undefinedportfolio/sitter-sanity/") { 
        return NextResponse.redirect(`${origin}/case-study/sitter-sanity/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/vumi/undefinedportfolio/vumi/") { 
        return NextResponse.redirect(`${origin}/case-study/vumi/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/vinwiki/undefinedportfolio/vinwiki/") { 
        return NextResponse.redirect(`${origin}/case-study/vinwiki/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/undefinedportfolio/") { 
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/apex-textile-company/undefinedportfolio/apex-textile-company/") { 
        return NextResponse.redirect(`${origin}/apex-textile-company`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/judicial-innovations/undefinedportfolio/judicial-innovations/") { 
        return NextResponse.redirect(`${origin}/case-study/judicial-innovations/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/joseline/undefinedportfolio/joseline/") { 
        return NextResponse.redirect(`${origin}/case-study/joseline`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/jax/undefinedportfolio/jax/") { 
        return NextResponse.redirect(`${origin}/case-study/car-rental-fleet-management-software`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/money-hungry/undefinedportfolio/money-hungry/") { 
        return NextResponse.redirect(`${origin}/case-study/money-hungry`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/turns-financing/undefinedportfolio/turns-financing/") { 
        return NextResponse.redirect(`${origin}/case-study/turns-financing`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/dreambook/undefinedportfolio/dreambook/") { 
        return NextResponse.redirect(`${origin}/case-study/dreambook`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/fitness-bank/undefinedportfolio/fitness-bank/") { 
        return NextResponse.redirect(`${origin}/case-study/fitness-bank/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/official-atlanta-tech-village-app-coworking-space/undefinedportfolio/official-atlanta-tech-village-app-coworking-space/") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/webapp-spa-space/undefinedportfolio/webapp-spa-space/") { 
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/cigaremo/undefinedportfolio/cigaremo/") { 
        return NextResponse.redirect(`${origin}/case-study/webapp-spa-space/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/fugleam/undefinedportfolio/fugleam/") { 
        return NextResponse.redirect(`${origin}/case-study/fugleam/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/sara-hospitality/undefinedportfolio/sara-hospitality/") { 
        return NextResponse.redirect(`${origin}/case-studysara-hospitality/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/imsafenow/undefinedportfolio/imsafenow/") { 
        return NextResponse.redirect(`${origin}/case-study/imsafenow/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/gls-georgia-library-service/undefinedportfolio/gls-georgia-library-service/") { 
        return NextResponse.redirect(`${origin}/case-study/georgia-library-service/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/faithaid/undefinedportfolio/faithaid/") { 
        return NextResponse.redirect(`${origin}/case-study/faithaid/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/ven-u2-go/undefinedportfolio/ven-u2-go/") { 
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/medcraze/undefinedportfolio/medcraze/") { 
        return NextResponse.redirect(`${origin}/case-study/medcraze/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/hotspawts/undefinedportfolio/hotspawts/") { 
        return NextResponse.redirect(`${origin}/portfolio/case-study/hotspawts/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/guardian/undefinedportfolio/guardian/") { 
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/amc-n-me/undefinedportfolio/amc-n-me/") { 
        return NextResponse.redirect(`${origin}/case-study/amc-n-me/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/uspace/undefinedportfolio/uspace/") { 
        return NextResponse.redirect(`${origin}/case-study/uspace/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/kwik/undefinedportfolio/kwik/") { 
        return NextResponse.redirect(`${origin}/case-study/kwik/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/get-sound/undefinedportfolio/get-sound/") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound/`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/the-hoteliers-network/undefinedportfolio/the-hoteliers-network/") { 
        return NextResponse.redirect(`${origin}/case-study/the-hoteliers-network/`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-get-sound") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/city-of-milton") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton`, 301)
    }
    if (req.nextUrl.pathname === "/web-development-life-cycle/undefinedweb-development-life-cycle/") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/small_Mobile_App_Security_Complete_Guide_e778074d75.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/uploads/Mobile_App_Security_Complete_Guide_e778074d75.webp") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/top-most-popular-websites/undefinedtop-most-popular-websites/") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/blog/how-mobile-apps-are-changing-the-way-of-doing-business/feed/") { 
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/hiring-experienced-partner/undefinedhiring-experienced-partner/") { 
        return NextResponse.redirect(`${origin}/blog/hiring-experienced-partner/undefinedhiring-experienced-partner/`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/truck-your-way-2") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-money-hungry") { 
        return NextResponse.redirect(`${origin}/case-study/money-hungry`, 301)
    }
    if (req.nextUrl.pathname === "/portfolio/built-x/undefinedportfolio/built-x/") { 
        return NextResponse.redirect(`${origin}/case-study/built-x/`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/spa-space") { 
        return NextResponse.redirect(`${origin}/case-study/spa-space`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/ios-apps-get-sound") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-skoozi") { 
        return NextResponse.redirect(`${origin}/case-study/skoozi`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/judicial-innovations") { 
        return NextResponse.redirect(`${origin}/case-study/online-dispute-resolution-platform`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-amc-n-me") { 
        return NextResponse.redirect(`${origin}/case-study/amc-n-me`, 301)
    }
    if (req.nextUrl.pathname === "/the-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting/undefinedthe-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting/") { 
        return NextResponse.redirect(`${origin}/blog/the-future-of-mobile-app-development-omnichannel-cognitive-and-self-adjusting/`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/web-apps-bobchats") { 
        return NextResponse.redirect(`${origin}/case-study`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-fugleam") { 
        return NextResponse.redirect(`${origin}/case-study/fugleam`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/android-apps-money-hungry") { 
        return NextResponse.redirect(`${origin}/case-study/money-hungry`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/spa-space-2") { 
        return NextResponse.redirect(`${origin}/case-study/spa-space`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/official-atlanta-tech-village-app-coworking-space") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/ios-apps-faithaid") { 
        return NextResponse.redirect(`${origin}/case-study/faithaid`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/city-of-milton-3") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton`, 301)
    }
    if (req.nextUrl.pathname === "/mobile-app-security-complete-guide") { 
        return NextResponse.redirect(`${origin}/blog/mobile-app-security-complete-guide/`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-las-vegas/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-las-vegas`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-fitness-bank") { 
        return NextResponse.redirect(`${origin}/case-study/fitness-bank`, 301)
    }
    if (req.nextUrl.pathname === "/best-web-development-tools-free-paid/undefinedbest-web-development-tools-free-paid/") { 
        return NextResponse.redirect(`${origin}/blog/best-web-development-tools-free-paid/`, 301)
    }
    if (req.nextUrl.pathname === "/best-web-design-software/undefinedbest-web-design-software/") { 
        return NextResponse.redirect(`${origin}/blog/best-web-design-software/u`, 301)
    }
    if (req.nextUrl.pathname === "/2021/05/") { 
        return NextResponse.redirect(`${origin}`, 301)
    }
    if (req.nextUrl.pathname === "/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/undefinedincreasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/") { 
        return NextResponse.redirect(`${origin}/blog/increasing-mobile-app-engagement-will-make-you-tons-of-cash-heres-how/`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-florida/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-virginia`, 301)
    }
    if (req.nextUrl.pathname === "/our-work/android-apps-venu2go/") { 
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go/`, 301)
    }
    if (req.nextUrl.pathname === "/best-free-wireframe-tools-2023/undefinedbest-free-wireframe-tools-2023/") { 
        return NextResponse.redirect(`${origin}/blog/best-free-wireframe-tools-2023/`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-enable-dark-mode-for-your-apps-save-battery-enhance-vision/undefinedhow-to-enable-dark-mode-for-your-apps-save-battery-enhance-vision/") { 
        return NextResponse.redirect(`${origin}/blog/how-to-enable-dark-mode-for-your-apps-save-battery-enhance-vision/`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-los-angeles/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-los-angeles`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-developer-denver/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-virginia`, 301)
    }
    if (req.nextUrl.pathname === "/us/app-development-new-york-city/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-virginia`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-san-diego/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-diego`, 301)
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-texas/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-san-francisco/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-san-diego`, 301)
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-seattle/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-seattle`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/copythat") { 
        return NextResponse.redirect(`${origin}/case-study/copythat`, 301)
    }
    if (req.nextUrl.pathname === "/how-to-reduce-the-size-of-your-iphone-app/undefinedhow-to-reduce-the-size-of-your-iphone-app/") { 
        return NextResponse.redirect(`${origin}/blog/how-to-reduce-the-size-of-your-iphone-app/`, 301)
    }
    if (req.nextUrl.pathname === "/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta/undefinedwhy-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta/") { 
        return NextResponse.redirect(`${origin}/blog/why-you-should-hire-appzoro-for-your-ios-app-development-in-atlanta/`, 301)
    }
    if (req.nextUrl.pathname === "/upcoming-web-design-trends-in-2023/undefinedupcoming-web-design-trends-in-2023/") { 
        return NextResponse.redirect(`${origin}/blog/upcoming-web-design-trends-in-2023/`, 301)
    }
    if (req.nextUrl.pathname === "/appzoro-technologies-is-a-top-atlanta-company/undefinedappzoro-technologies-is-a-top-atlanta-company/") { 
        return NextResponse.redirect(`${origin}/blog/appzoro-technologies-is-a-top-atlanta-company`, 301)
    }
    if (req.nextUrl.pathname === "/which-is-better-for-my-first-app-android-or-ios/undefinedwhich-is-better-for-my-first-app-android-or-ios/") { 
        return NextResponse.redirect(`${origin}/blog/which-is-better-for-my-first-app-android-or-ios`, 301)
    }
    if (req.nextUrl.pathname === "/know-more-about-india-stack/undefinedknow-more-about-india-stack/") { 
        return NextResponse.redirect(`${origin}/blog/know-more-about-india-stack/`, 301)
    }
    if (req.nextUrl.pathname === "/how-iot-is-helpful-to-success-in-e-scooter-app-development/undefinedhow-iot-is-helpful-to-success-in-e-scooter-app-development/") { 
        return NextResponse.redirect(`${origin}/blog/how-iot-is-helpful-to-success-in-e-scooter-app-development/`, 301)
    }
    if (req.nextUrl.pathname === "/best-back-end-web-development-tools/undefinedbest-back-end-web-development-tools/") { 
        return NextResponse.redirect(`${origin}/blog/best-back-end-web-development-tools/`, 301)
    }
    if (req.nextUrl.pathname === "/the-best-android-apps-of-2017/undefinedthe-best-android-apps-of-2017/") { 
        return NextResponse.redirect(`${origin}/blog/the-best-android-apps-of-2017/`, 301)
    }
    if (req.nextUrl.pathname === "/common-concerns-while-making-you-own-first-android-app/feed/") { 
        return NextResponse.redirect(`${origin}/blog/common-concerns-while-making-you-own-first-android-app/`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/kwik-3") { 
        return NextResponse.redirect(`${origin}/case-study/kwik-3`, 301)
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-cowork-oasis") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301) }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-fitness-bank") { 
        return NextResponse.redirect(`${origin}/case-study/fitness-bank`, 301) 
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/hotspawts-3") { 
        return NextResponse.redirect(`${origin}/case-study/hotspawts`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/official-atlanta-tech-village-app-coworking-space") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-get-sound") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/imsafenow-2") { 
        return NextResponse.redirect(`${origin}/case-study/imsafenow`, 301) 
    }
    if (req.nextUrl.pathname === "/2021/02/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/faithaid") { 
        return NextResponse.redirect(`${origin}/case-studies/faithaid`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-balltalk") { 
        return NextResponse.redirect(`${origin}/case-studies/balltalk`, 301) 
    }
    if (req.nextUrl.pathname === "/category/ipad/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/guardian") { 
        return NextResponse.redirect(`${origin}/case-study/real-estate-title-search-software-development`, 301) 
    }
    if (req.nextUrl.pathname === "/category/mobile-apps/") { 
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-sitter-sanity/") { 
        return NextResponse.redirect(`${origin}/case-study/sitter-sanity/`, 301) 
    }
    if (req.nextUrl.pathname === "/know-more-about-kotlin/undefinedknow-more-about-kotlin/") { 
        return NextResponse.redirect(`${origin}/technology`, 301) 
    }
    if (req.nextUrl.pathname === "/category/video-post/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/2020/11/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/tag/android-mobile-app-development/") { 
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/tag/android-app-development/") { 
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/author/appzoro/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/category/instagram/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/tag/monetizing-app/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/category/fashion/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-balltalk") { 
        return NextResponse.redirect(`${origin}/case-study/balltalk`, 301) 
    }
    if (req.nextUrl.pathname === "/iphone-app-developer-denver/web-apps-apextexco") { 
        return NextResponse.redirect(`${origin}/case-study/apex-textile-company`, 301) 
    }
    if (req.nextUrl.pathname === "/portfolio/truck-your-way/undefinedportfolio/truck-your-way/") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/tag/mobile-apps-company-atlanta-ga/") { 
        return NextResponse.redirect(`${origin}/services/mobile-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/us/iphone-app-development-atlanta/ios-apps/cowork-oasis") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-venu2go") { 
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/web-apps-apextexco") { 
        return NextResponse.redirect(`${origin}/case-study/apex-textile-company`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/kwik-3") { 
        return NextResponse.redirect(`${origin}/case-study/kwik`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-cowork-oasis") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/web-apps-open-on-sunday") { 
        return NextResponse.redirect(`${origin}/case-study/open-on-sunday`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-cigaremo/") { 
        return NextResponse.redirect(`${origin}/case-study/cigaremo/`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-skoozi") { 
        return NextResponse.redirect(`${origin}/case-study/skoozi`, 301) 
    }
    if (req.nextUrl.pathname === "/us/mobile-app-development-chicago/") { 
        return NextResponse.redirect(`${origin}/locations/mobile-app-development-chicago`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/ios-apps-cowork-oasis") { 
        return NextResponse.redirect(`${origin}/case-study/official-atlanta-tech-village-app-cowork`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/imsafenow-2") { 
        return NextResponse.redirect(`${origin}/case-study/imsafenow`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/android-apps-cigaremo") { 
        return NextResponse.redirect(`${origin}/case-study/cigaremo/`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-las-vegas/city-of-milton") { 
        return NextResponse.redirect(`${origin}/case-study/city-of-milton`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/Best_IDE_for_Android_App_Development_in_2024_6a55098484.webp") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/iphone-app-development-atlanta/android-apps-venu2go") { 
        return NextResponse.redirect(`${origin}/case-study/ven-u2-go`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/thumbnail_Mobile_App_Security_Complete_Guide_e778074d75.webp") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/mobile-app-development-seattle/ios-apps-get-sound") { 
        return NextResponse.redirect(`${origin}/case-study/get-sound`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/small_Flutter_App_Development_Pros_and_Cons_d6a355504b.webp") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/free-") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/uploads/Flutter_App_Development_Pros_and_Cons_d6a355504b.webp") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/category/food-for-thought/") { 
        return NextResponse.redirect(`${origin}`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/truck-your-way") { 
        return NextResponse.redirect(`${origin}/case-study/construction-app-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/case-study/jax-rideshare") {
        return NextResponse.redirect(`${origin}/case-study/car-rental-fleet-management-software`, 301)
    }
    if (req.nextUrl.pathname === "/case-study/judicial-innovations") { 
        return NextResponse.redirect(`${origin}/case-study/online-dispute-resolution-platform`, 301) 
    }
    if (req.nextUrl.pathname === "/locations/iphone-app-developer-atlanta") { 
        return NextResponse.redirect(`${origin}/services/ios-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/services/custom-software-development-solutions") { 
        return NextResponse.redirect(`${origin}/services/custom-software-development-company-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/locations/iphone-app-development-atlanta") { 
        return NextResponse.redirect(`${origin}/services/ios-app-development`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/fintech-app-development-company-an-ultimate-guide") { 
        return NextResponse.redirect(`${origin}/blog/fintech-app-development-a-complete-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/leading-fintech-app-development-company-in-usa") { 
        return NextResponse.redirect(`${origin}/blog/fintech-app-development-a-complete-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/fintech-software-development-an-ultimate-guide") { 
        return NextResponse.redirect(`${origin}/blog/custom-fintech-software-development-a-comprehensive-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/llm-development-company-ultimate-guide-for-businesses") { 
        return NextResponse.redirect(`${origin}/blog/llm-application-development-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/streamline-court-room-with-legal-software-development-services") { 
        return NextResponse.redirect(`${origin}/blog/legal-software-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/maximize-roi-with-best-mobile-app-development-company-in-USA") { 
        return NextResponse.redirect(`${origin}/blog/best-mobile-app-development-company-in-USA`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-to-choose-a-mobile-app-development-company") { 
        return NextResponse.redirect(`${origin}/blog/choose-the-best-mobile-app-development-company-in-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-to-choose-a-mobile-app-development-company-for-startups") { 
        return NextResponse.redirect(`${origin}/blog/choose-the-best-mobile-app-development-company-in-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-to-choose-a-right-mobile-app-development-company") { 
        return NextResponse.redirect(`${origin}/blog/choose-the-best-mobile-app-development-company-in-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-to-choose-the-best-UI-UX-design-services-provider") { 
        return NextResponse.redirect(`${origin}/blog/choose-the-best-ui-ux-design-services-in-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/the-ultimate-checklist-for-choosing-the-right-ui-ux-design-company") { 
        return NextResponse.redirect(`${origin}/blog/choose-the-best-ui-ux-design-services-in-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/ui-ux-design-and-development-services-in-usa") { 
        return NextResponse.redirect(`${origin}/blog/ui-ux-design-and-development-services-a-complete-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/a-comprehensive-guide-to-custom-software-development") { 
        return NextResponse.redirect(`${origin}/blog/custom-software-development-solutions-a-complete-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/generative-ai-app-development-guide") { 
        return NextResponse.redirect(`${origin}/blog/ai-app-development-company-a-ultimate-guide-in-2025`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/ai-ml-development-company-in-usa-transform-your-business") { 
        return NextResponse.redirect(`${origin}/blog/ai-ml-development-services-a-complete-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/key-considerations-before-choosing-an-ai-ml-development-company") { 
        return NextResponse.redirect(`${origin}/blog/choose-right-ai-ml-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/top-10-custom-software-development-companies-in-usa-2025") { 
        return NextResponse.redirect(`${origin}/blog/top-10-custom-software-development-companies-in-usa`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/ai-app-development-company-a-ultimate-guide-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/ai-app-development-company-a-ultimate-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-long-does-it-take-time-to-develop-mobile-apps-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/how-long-does-it-take-time-to-develop-mobile-apps`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/best-tech-stack-for-ai-ml-development-2025") { 
        return NextResponse.redirect(`${origin}/blog/best-tech-stack-for-ai-ml-development`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/custom-software-development-really-cost-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/custom-software-development-really-cost`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-much-does-cross-platform-app-development-cost-2025") { 
        return NextResponse.redirect(`${origin}/blog/how-much-does-cross-platform-app-development-cost`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/upcoming-web-design-trends-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/upcoming-web-design-trends`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/top-features-to-look-for-legal-software-development-services-2025") { 
        return NextResponse.redirect(`${origin}/blog/top-features-to-look-for-legal-software-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/top-cross-platform-frameworks-you-should-know-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/top-cross-platform-frameworks-you-should-know`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-much-does-transportation-app-development-cost-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/how-much-does-transportation-app-development-cost`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/why-ui-ux-design-is-critical-to-your-apps-success-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/why-ui-ux-design-is-critical-to-your-apps-success`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-to-find-the-best-cross-platform-app-development-company") { 
        return NextResponse.redirect(`${origin}/blog/best-cross-platform-app-development-company`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/top-cross-platform-app-development-framework") { 
        return NextResponse.redirect(`${origin}/blog/top-cross-platform-frameworks-you-should-know-in-2025`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/a-comprehensive-guide-to-cross-platform-app-development") { 
        return NextResponse.redirect(`${origin}/blog/cross-platform-app-development-services-a-depth-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/cross-platform-mobile-app-development-services") { 
        return NextResponse.redirect(`${origin}/blog/cross-platform-app-development-services-a-depth-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/how-to-Develop-a-Transportation-App-in-2025") { 
        return NextResponse.redirect(`${origin}/blog/complete-transportation-app-development-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/choose-right-ai-ml-development-company-for-your-business") { 
        return NextResponse.redirect(`${origin}/blog/choose-right-ai-ml-development-services`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/enterprise-mobile-app-development-a-complete-guide") { 
        return NextResponse.redirect(`${origin}/blog/enterprise-mobile-app-development-services-an-ultimate-guide`, 301) 
    }
    if (req.nextUrl.pathname === "/blog/mobile-enterprise-app-development-guide") { 
        return NextResponse.redirect(`${origin}/blog/enterprise-mobile-app-development-services-an-ultimate-guide`, 301) 
    }

    if (req.nextUrl.pathname === "/blog/the-rise-of-ai-will-be-consequential-for-blue-collar-workers") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/blog/how-mobile-apps-are-changing-the-way-of-doing-business") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/blog/how-to-develop-a-complete-bug-free-mobile-application") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }
    if (req.nextUrl.pathname === "/blog/link") {
        return NextResponse.redirect(`${origin}/blog`, 301)
    }

    const dynamicRedirect = await maybeApplyDynamicRedirect(req, origin)
    if (dynamicRedirect) return dynamicRedirect

   const res = NextResponse.next()

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin

    return res
}
