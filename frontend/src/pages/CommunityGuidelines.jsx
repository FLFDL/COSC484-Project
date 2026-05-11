import React from 'react'

export const CommunityGuidelines = () => {
  return (
    <main id="guidelines-page">
      <div id="guidelines-title">
        <h1>Community Guidelines</h1>
      </div>
      <div id="guidelines-container">
        <div id="guidelines-tab">
          <ul id="guidelines-toc">
            <h3>Table of Contents</h3>
            <li className="guidelines-toc-item">
              <a href="#respect">Respect</a>
            </li>
            <li className="guidelines-toc-item">
              <a href="#hate-speech">Discrimination</a>
            </li>
            <li className="guidelines-toc-item">
              <a href="#mistreatment">Mistreatments</a>
            </li>
            <li className="guidelines-toc-item">
              <a href="#misinformation">Misinformation</a>
            </li>
          </ul>
        </div>

        <div id="guidelines-content">
          <h2 id="mission">Our Mission</h2>
          <div className="guidelines-text">
            <p>To provide a welcoming, loving, and accepting space for all pets and pet owners, we have created these community guidelines.</p>
            <p>We ask that all users of Petstagram follow these guidelines to ensure that our community remains a safe and enjoyable space for everyone.</p>
            <p>Repeated violations of these guidelines may result in content removal or account suspension.</p>
          </div>
          <h3 className="guidelines-heading" id="respect">Respect and Inclusivity</h3>
          <div className="guidelines-text">
            <p>All users of Petstagram should treat each other with respect and kindness. We do not tolerate any form of harassment, bullying, or discrimination based on race, gender, sexuality, religion, or any other characteristic.</p>
            <p>We encourage users to celebrate diversity and to create a welcoming environment for all members of our community.</p>

            <p>No harassment, threats, or personal attacks toward other users.</p>
            <p>Do not post abusive, explicit, or offensive comments.</p>
            <p>Respect other users’ privacy and do not share personal information without permission.</p>

          </div>
          <h3 className="guidelines-heading" id="hate-speech">Hate speech and Discrimination</h3>
          <div className="guidelines-text">
            <p>No form of hate speech will be tolerated. This platform was created for the spread of love and joy. Anything moderators feel is not in the pursuit of love and joy will be removed and the user will face suspension.</p>
          </div>

          <h3 className="guidelines-heading" id="mistreatment">Mistreatment of Pets or Others</h3>
          <div className="guidelines-text">
            <p>There should be no posting of or allusion to the mistreatment of pets or other people. Petstagram is
              a safe space meant for uplifting the pet community.</p>
          </div>



          <h3 className="guidelines-heading" id="misinformation">Spread of Misinformation</h3>
          <div className="guidelines-text">
            <p>The spread of misinformation in any way is extremely advised against and may result in a user getting
              permissions revoked</p>
            <p>We are in the age of misinformation, and it is important that all users of Petstagram do their best to pursue and maintain a good understanding of all information before posting anything and claiming they are factual</p>
          </div>



        </div>
      </div>

    </main>

  )
}
