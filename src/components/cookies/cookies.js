import { useState } from 'react';
import style from './cookies.module.css';

const CookiesBanner = () => {
    const [is_cookies_accepted, set__is_cookies_accepted] = useState(localStorage.getItem("cookies") === "accepted");

    if (!is_cookies_accepted) {
        return (
            <div className={style.cookies_banner}>
                <div className={style.cookies_banner__container}>
                    <div className={style.cookies_banner_text}>
                        <p>
                            We use cookies to ensure you get the best experience on our website.
                            By continuing to use our site, you accept our use of cookies, privacy policy and terms of service.
                        </p>
                    </div>
                    <div className={style.cookies_banner_buttons}>
                        <a
                            className={style.cookies_banner_button}
                            onClick={() => {
                                localStorage.setItem("cookies", "accepted");
                                set__is_cookies_accepted(true);
                            }}
                            href='#'
                        >
                            Accept
                        </a>
                        <a
                            className={style.cookies_banner_button}
                            href="/privacy-policy"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default CookiesBanner;