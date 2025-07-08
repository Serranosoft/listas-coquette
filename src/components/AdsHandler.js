import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { /* AdsConsent, AdsConsentStatus, */ useInterstitialAd } from "react-native-google-mobile-ads";
import { intersitialId, loadId } from "../utils/constants";
import { AdEventType, AppOpenAd } from "react-native-google-mobile-ads";
import { AppState } from "react-native";
// import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
// import mobileAds from 'react-native-google-mobile-ads/src';

const AdsHandler = forwardRef((props, ref) => {

    const {
        isLoaded: isLoadedIntersitial,
        isClosed: isClosedIntersitial,
        load: loadIntersitial,
        show: showIntersitial } = useInterstitialAd(intersitialId);

    const [adsLoaded, setAdsLoaded] = useState(false);

    /* CONSENT */
    useEffect(() => {
        /* const prepare = async () => {
            console.log('Starting ad initialization...');
            // TODO: if the ATT doesn't show up, add a small delay
            const trackingResult = await requestTrackingPermissionsAsync();
            console.log('Tracking permission result:', trackingResult);
            try {
                const consentInfo = await AdsConsent.requestInfoUpdate();
                console.log('Consent info:', consentInfo);
                if (consentInfo.isConsentFormAvailable && consentInfo.status === AdsConsentStatus.REQUIRED) {
                    console.log('Showing consent form...');
                    try {
                        await AdsConsent.showForm();
                    } catch (formError) {
                        console.log('Error showing consent form:', formError);
                        // Continue even if form fails to show
                    }
                }
                console.log('Initializing mobile ads...');
                await mobileAds().initialize();
                console.log('Mobile ads initialized successfully');
                setAdsLoaded(true);
            } catch (e) {
                console.log('Error during ad initialization:', e);
                // Still try to initialize ads even if consent fails
                try {
                    await mobileAds().initialize();
                    console.log('Mobile ads initialized successfully despite consent error');
                    setAdsLoaded(true);
                } catch (initError) {
                    console.log('Failed to initialize ads:', initError);
                }
            }
        } */
        // prepare();
    }, []);

    useEffect(() => {
        loadIntersitial();
    }, [loadIntersitial])

    useImperativeHandle(ref, () => ({
        loadIntersitialAd() {
            loadIntersitial();
        },
        showIntersitialAd() {
            props.setShowOpenAd(false);
            showIntersitialAd();
        },
        isClosedIntersitial() {
            return isClosedIntersitial;
        },
        isLoadedIntersitial() {
            return isLoadedIntersitial;
        },
        isAdsLoaded() {
            return adsLoaded;
        }
    }))

    useEffect(() => {
        if (isClosedIntersitial) {
            if (props.closedIntersitialCallback) {
                props.closedIntersitialCallback();
            }
        } else {
            loadIntersitial();
        }

    }, [isClosedIntersitial, props.closedIntersitialCallback])


    function showIntersitialAd() {
        if (isLoadedIntersitial) {
            showIntersitial();
        } else {
            loadIntersitial();
        }
    }


    /** APP OPEN ADS (BACKGROUND -> FOREGROUND -> SHOW ADD) */
    const openAdRef = useRef(null);
    const openAdLoadedRef = useRef(false);
    const [appStateChanged, setAppStateChanged] = useState(AppState.currentState);

    useEffect(() => {
        adsLoaded && appStateChanged == "active" && handleOpenAd();
    }, [appStateChanged])

    function handleOpenAd() {
        // Cuando adtrigger es 0 significa que acaba de hacer un posible trigger de un intersitialAd
        if (props.showOpenAd) {
            openAdRef.current && openAdLoadedRef.current && openAdRef.current.show();
        } else {
            props.setShowOpenAd(true);
        }
    }

    useEffect(() => {
        const appOpenAd = AppOpenAd.createForAdRequest(loadId);
        appOpenAd.load();

        appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            openAdRef.current = appOpenAd;
            openAdLoadedRef.current = true;
        });
        appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
            openAdRef.current.load();
            openAdLoadedRef.current = false;
        });
        appOpenAd.addAdEventListener(AdEventType.ERROR, () => {
        });
        AppState.addEventListener("change", nextAppState => {
            setAppStateChanged(nextAppState);
        })
    }, [])



    return <></>
})

export default AdsHandler