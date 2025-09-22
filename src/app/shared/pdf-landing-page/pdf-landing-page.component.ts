import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-pdf-landing-page',
  templateUrl: './pdf-landing-page.component.html',
  styleUrls: ['./pdf-landing-page.component.scss']
})
export class PdfLandingPageComponent {
     @HostBinding("class.flex-base") appliedClass = true;
//  currentIndex = 0;
//   totalSections = 4;

//   scrollTo(direction: 'prev' | 'next') {
//     if (direction === 'next' && this.currentIndex < this.totalSections - 1) {
//       this.currentIndex++;
//     } else if (direction === 'prev' && this.currentIndex > 0) {
//       this.currentIndex--;
//     }

//     const targetId = 'section' + this.currentIndex;
//     const targetEl = document.getElementById(targetId);
//     targetEl?.scrollIntoView({ behavior: 'smooth' });
//   }

 // Section visibility flags
  isOverallScore = true;
  isProcessScore = true;
  isSubProcessScore = true;
  isBenchmarking = true;
  isCategory = true;
  isSurvey = true;
  isQuestionDetails = true;

  currentIndex = 0;

  // Return visible section IDs based on flags
  getVisibleSectionIds(): string[] {
    const flags = [
      this.isOverallScore,
      this.isProcessScore,
      this.isSubProcessScore,
      this.isBenchmarking,
      this.isCategory,
      this.isSurvey,
      this.isQuestionDetails
    ];

    return flags
      .map((visible, i) => visible ? `section${i}` : null)
      .filter((id): id is string => id !== null);
  }

  scrollTo(direction: 'prev' | 'next') {
    const visibleSections = this.getVisibleSectionIds();
    const currentSectionId = `section${this.currentIndex}`;
    let currentVisibleIndex = visibleSections.indexOf(currentSectionId);

    if (direction === 'next' && currentVisibleIndex < visibleSections.length - 1) {
      currentVisibleIndex++;
    } else if (direction === 'prev' && currentVisibleIndex > 0) {
      currentVisibleIndex--;
    } else {
      return; // No further scrolling possible
    }

    const targetId = visibleSections[currentVisibleIndex];
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      this.currentIndex = parseInt(targetId.replace('section', ''), 10);
    }
  }
}
