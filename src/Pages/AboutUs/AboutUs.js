import React from "react";
import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div>
      <h1 className="about_h1">Desenvolvedores</h1>
      <IconContext.Provider value={{ className: "about_icons" }}>
        <div className="about_team_front-end">
          <div className="about_team_card">
            <img
              className="about_team_card_img"
              src="https://avatars.githubusercontent.com/u/73550479?v=4"
              alt="imagem profile"
            />
            <div className="about_team_card_name">Paulo Gama</div>
            <div className="about_team_card_area">Full-Stack</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/paulohenriquegama"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/paulohenriquegama/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="about_team_card">
            <img
              className="about_team_card_img"
              src="https://avatars.githubusercontent.com/u/59737482?v=4"
              alt="Imagem profile"
            />
            <div className="about_team_card_name">Thaynar Brandão</div>
            <div className="about_team_card_area">Full-Stack</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/thaynarbo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/thaynar-brandão/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="about_team_card">
            <img
              className="about_team_card_img"
              src="https://avatars.githubusercontent.com/u/85586091?v=4"
              alt="imagem profile"
            />
            <div className="about_team_card_name">Cauã Campos</div>
            <div className="about_team_card_area">Full-Stack</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/OldOne05"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/cauã-campos-bb3b33218/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="about_team_card">
            <img
              className="about_team_card_img"
              src="https://avatars.githubusercontent.com/u/85564550?v=4"
              alt="imagem profile"
            />
            <div className="about_team_card_name">Patrick Wendel</div>
            <div className="about_team_card_area">Full-Stack</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/wendeel-lima"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/wendeellima/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="about_team_back-end">
          <div className="about_team_card">
            <img
              className="about_team_card_img"
              alt="imagem profile"
              src="https://media-exp1.licdn.com/dms/image/C4D03AQHJZDutaMIViA/profile-displayphoto-shrink_200_200/0/1637250762775?e=1643241600&v=beta&t=Qc3-PM1ieUfJNp8aVtsRL31luFp-Xew10lsE2y5D3IQ"
            />
            <div className="about_team_card_name">Janice Caldeira</div>
            <div className="about_team_card_area">Back-End</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/janicecaldeira"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/janicecaldeira/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="about_team_card">
            <img
              alt="imagemprofile"
              className="about_team_card_img"
              src="https://avatars.githubusercontent.com/u/70717919?v=4"
            />
            <div className="about_team_card_name">Dorival Ramos</div>
            <div className="about_team_card_area">Back-End</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/DorivalRamos"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/dorival-ramos-millan-96a1a0147/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="about_team_card">
            <img
              alt="imagemprofile"
              className="about_team_card_img"
              src="https://avatars.githubusercontent.com/u/55546267?v=4"
            />
            <div className="about_team_card_name">Priscila Miranda</div>
            <div className="about_team_card_area">Back-End</div>
            <br />
            <div className="about_team_card_icons">
              <div className="about_team_card_icons_github">
                <a
                  href="https://github.com/priscilafraser"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </div>
              <div className="about_team_card_icons_linkedin">
                <a
                  href="https://www.linkedin.com/in/priscila-miranda-95a60b4a/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default AboutUs;
