import React from 'react';
import { useTranslation } from 'react-i18next';

 import "../css/userInfoStyles.css";

const Terms = () => {
    const { t } = useTranslation(['userInfo']);

    return (
        <div className="main_info">
            <div className="container_info">
                <h1>{t('terms.title')}</h1>

                <h2>{t('terms.point1')}</h2>
                <p>{t('terms.point1_text')}</p>

                <h2>{t('terms.point2')}</h2>
                <p><strong>{t('terms.point2_text1')}</strong>{t('terms.point2_text2')}</p>

                <h2>{t('terms.point3')}</h2>
                <p>{t('terms.point3_text1')}</p>
                <p>{t('terms.point3_text2')}</p>

                <h2>{t('terms.point4')}</h2>
                <p>{t('terms.point4_text')}</p>

                <h2>{t('terms.point5')}</h2>
                <p>{t('terms.point5_text')}</p>

                <h2>{t('terms.point6')}</h2>
                <p>{t('terms.point6_text')}</p>

                <p className="last-updated">{t('terms.last_update')}</p>
            </div>
        </div>
    );
};

export default Terms;