import React from 'react';
import { useTranslation } from 'react-i18next';

import "../css/userInfoStyles.css";

const Privacy = () => {
    const { t } = useTranslation(['userInfo']);

    return (
        <div className="main_info">
            <div className="container_info">
                <h1>{t('privacy.title')}</h1>
                <p>{t('privacy.subtitle')}</p>

                <h2>{t('privacy.point1')}</h2>
                <p>
                    {t('privacy.point1_text1')}
                    <strong>{t('privacy.point1_text2')}</strong>
                    {t('privacy.point1_text3')}
                </p>
                <p>
                    {t('privacy.point1_text4')}
                    <strong>LocalStorage</strong>
                    {t('privacy.point1_text5')}
                </p>

                <h2>{t('privacy.point2')}</h2>
                <p>{t('privacy.point2_text1')}</p>
                <ul>
                    <li>
                        <strong>{t('privacy.point2_text2')}</strong> {t('privacy.point2_text3')}
                    </li>
                </ul>

                <h2>{t('privacy.point3')}</h2>
                <p>
                    {t('privacy.point3_text1')}
                    <strong>Google AdSense</strong>
                    {t('privacy.point3_text2')}
                </p>
                <ul>
                    <li>
                        {t('privacy.point3_text3')}
                        <strong>cookie DART</strong>
                        {t('privacy.point3_text4')}
                    </li>
                    <li>{t('privacy.point3_text5')}</li>
                    <li>
                        {t('privacy.point3_text6')}
                        <a
                            href="https://policies.google.com/technologies/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t('privacy.point3_text7')}
                        </a>
                        .
                    </li>
                </ul>
                <p>
                    {t('privacy.point3_text8')}
                    <a
                        href="https://policies.google.com/privacy/partners"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('privacy.point3_text9')}
                    </a>
                    .
                </p>

                <h2>{t('privacy.point4')}</h2>
                <p>{t('privacy.point4_text')}</p>

                <h2>{t('privacy.point5')}</h2>
                <p>{t('privacy.point5_text')}</p>

                <h2>{t('privacy.point6')}</h2>
                <p>{t('privacy.point6_text')}</p>

                <p className="last-updated">{t('privacy.last_update')}</p>
            </div>
        </div>

    );
};

export default Privacy;