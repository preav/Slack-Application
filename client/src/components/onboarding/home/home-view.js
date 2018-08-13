import createHTMLElement from '../onboarding-service';

export const homeViewHolderId = 'signupContainer';

export function homePageComponent() {
  const homeComponent = createHTMLElement(
    `<div class="d-flex flex-fill home-section">
        <div class="d-flex flex-fill home-section-inner flex-wrap">
        <section class="col">
            <div>
            <img src="./client/src/img/slack.png" alt="Slack brings all your communication together">
            </div>
        </section>
        <section class="col">
            <div class=""> 
            <h1 class="home-section-header">Where Work Happens</h1>
            <p class="home-section-paragraph pt-3">When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Slack has you covered.</p>
            <button id="git-login" class="btn btn-lg btn-outline-primary">Login By GitHub</button>
            </div>
        </section>
        </div>
    </div>`,
  );

  return homeComponent;
}
