import React from 'react'
import profileimg from './img/about/profile.jpg'
import about from './src/about'
import projects from './src/projects'
import contact from './src/contact'
import resumepdf from "./docs/Gabriel 'Chappy' Asel Resume.pdf"

import './Portfolio.css'
import './styles/about.css'
import './styles/contact.css'
import './styles/projects.css'
import './styles/resume.css'
import './styles/style.css'

export default function Portfolio() {
  return (
    <div className="App">
      <article class="about">
        <h1>About Me</h1>
        <img src={profileimg} />
        <p dangerouslySetInnerHTML={about.description}></p>
      </article>
      <article class="projects">
        <h1>Projects</h1>
        <section>
          {projects.list.map((p, _) => {
            return (
              <div
                class="shadow"
                onClick={_ => (window.location.href = p.link)}
              >
                <div
                  class="blur"
                  style={{
                    backgroundImage: `url(${require('./img/projects/' +
                      p.image)}`,
                  }}
                ></div>
                <div class="content">
                  <h3>{p.name}</h3>
                </div>
              </div>
            )
          })}
        </section>
      </article>
      <article class="resume">
        <h1>Resume</h1>
        <section>
          <div onClick={_ => (window.location.href = resumepdf)}>
            <h3>Download</h3>
          </div>
        </section>
      </article>
      <article class="contact">
        <h1>Contact</h1>
        <section>
          {contact.list.map((c, _) => {
            return (
              <div
                class="shadow"
                style={{
                  backgroundImage: `url(${require('./img/contact/' + c.image)}`,
                }}
                title={c.name}
                onClick={_ => (window.location.href = c.link)}
              ></div>
            )
          })}
        </section>
      </article>
    </div>
  )
}
