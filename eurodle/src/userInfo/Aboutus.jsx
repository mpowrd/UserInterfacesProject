import React from 'react';
import { useTranslation } from 'react-i18next';

 import "../css/userInfoStyles.css";

const Aboutus = () => {
    const { t } = useTranslation(['userInfo']);

    return (
        <div className="main_info">
            <div className="container_info">

                <div lang="es">
                    <h1>{t('aboutUs.title')}</h1>
                    <p>{t('aboutUs.intro1')}<strong> Eurodle</strong>{t('aboutUs.intro2')}<a href="https://www.uma.es/">{t('aboutUs.intro3')}</a>{t('aboutUs.intro4')}</p>

                    <h2>{t('aboutUs.mission')}</h2>
                    <p>{t('aboutUs.mission1')}</p>

                    <h2>{t('aboutUs.opinion')}</h2>
                    <p>{t('aboutUs.opinion1')}</p>

                    <h2>{t('aboutUs.contact')}</h2>
                    <p>{t('aboutUs.contact1')} <a
                        href="mailto:contact@eurodle.game">contact@eurodle.game</a>.</p>
                    <p><strong>{t('aboutUs.team')}</strong></p>
                    <ul className="about-us-list">
                        <li><a href="https://github.com/elyez54" target="_blank" rel="noopener noreferrer">{t('aboutUs.team_members.1')}</a></li>
                        <li><a href="https://github.com/jtdelgado" target="_blank" rel="noopener noreferrer">{t('aboutUs.team_members.2')}</a></li>
                        <li><a href="https://github.com/mpowrd" target="_blank" rel="noopener noreferrer">{t('aboutUs.team_members.3')}</a></li>
                        <li><a href="https://github.com/Snowbeeee" target="_blank" rel="noopener noreferrer">{t('aboutUs.team_members.4')}</a></li>
                        <li><a href="https://github.com/Fjjorda" target="_blank" rel="noopener noreferrer">{t('aboutUs.team_members.5')}</a></li>
                    </ul>
                    <p>{t('aboutUs.github')}<a href="https://github.com/mpowrd/UserInterfacesProject">GitHub</a>.</p>
                    <h2>{t('aboutUs.future')}</h2>
                    <p>{t('aboutUs.future1')}</p>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;