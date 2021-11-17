import React from 'react';
import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import "./AboutUs.css";

function AboutUs() {
    return (
        <div>
            <h1 className="about_h1">Desenvolvedores</h1>
            <IconContext.Provider value={{ className: "about_icons" }} >
                <div className="about_team">
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://media-exp1.licdn.com/dms/image/C4E03AQHpNLfFFHG9eA/profile-displayphoto-shrink_200_200/0/1623186716641?e=1642636800&v=beta&t=2pAzwLvcqtPHnERQZat1T4koNgl_Nd8GzHVA92ggtOA" />
                        <div className="about_team_card_name">Janice Caldeira</div>
                        <div className="about_team_card_area">Back-End</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/janicecaldeira" target="_blank"><BsGithub /></a>
                                </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/janicecaldeira/" target="_blank"><AiFillLinkedin /></a>
                                </div>
                        </div>
                    </div>
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://avatars.githubusercontent.com/u/73550479?v=4" />
                        <div className="about_team_card_name">Paulo Gama</div>
                        <div className="about_team_card_area">Full-Stack</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/paulohenriquegama" target="_blank"><BsGithub /></a>
                            </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/paulohenriquegama/" target="_blank"><AiFillLinkedin /></a>
                            </div>
                        </div>
                    </div>
                
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://avatars.githubusercontent.com/u/59737482?v=4" />
                        <div className="about_team_card_name">Thaynar Brandão</div>
                        <div className="about_team_card_area">Full-Stack</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/thaynarbo" target="_blank"><BsGithub /></a>
                            </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/thaynar-brandão/" target="_blank"><AiFillLinkedin /></a>
                            </div>
                        </div>
                    </div>
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://avatars.githubusercontent.com/u/85586091?v=4" />
                        <div className="about_team_card_name">Cauã Campos</div>
                        <div className="about_team_card_area">Full-Stack</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/OldOne05" target="_blank"><BsGithub /></a>
                            </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/cauã-campos-bb3b33218/" target="_blank"><AiFillLinkedin /></a>
                            </div>
                        </div>
                    </div>
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://avatars.githubusercontent.com/u/85564550?v=4" />
                        <div className="about_team_card_name">Patrick Wendel</div>
                        <div className="about_team_card_area">Full-Stack</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/wendeel-lima" target="_blank"><BsGithub /></a>
                            </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/wendeellima/" target="_blank"><AiFillLinkedin /></a>
                            </div>
                        </div>
                    </div>
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://avatars.githubusercontent.com/u/70717919?v=4" />
                        <div className="about_team_card_name">Dorival Ramos</div>
                        <div className="about_team_card_area">Back-End</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/DorivalRamos" target="_blank"><BsGithub /></a>
                            </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/dorival-ramos-millan-96a1a0147/" target="_blank"><AiFillLinkedin /></a>
                            </div>
                        </div>
                    </div>
                    <div className="about_team_card">
                        <img className="about_team_card_img" src="https://avatars.githubusercontent.com/u/55546267?v=4" />
                        <div className="about_team_card_name">Priscila Miranda</div>
                        <div className="about_team_card_area">Back-End</div>
                        <br />
                        <div className="about_team_card_icons">
                            <div className="about_team_card_icons_github">
                                <a href="https://github.com/priscilafraser" target="_blank"><BsGithub /></a>
                            </div>
                            <div className="about_team_card_icons_linkedin">
                                <a href="https://www.linkedin.com/in/priscila-miranda-95a60b4a/" target="_blank"><AiFillLinkedin /></a>
                            </div>
                        </div>
                    </div>
                </div>
                </IconContext.Provider>
            </div>
    )
}

export default AboutUs
