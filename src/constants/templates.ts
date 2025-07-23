export const templates = [
	{
		id: "blank",
		label: "Blank Document",
		imageUrl: "/blank-document.svg",
		initialContent: ""
	},
	{
		id: "software-proposal",
		label: "Software Development Proposal",
		imageUrl: "/software-proposal.svg",
		initialContent: `# Software Development Proposal

## Project Overview
**Project Name:** [Your Project Name]
**Client:** [Client Name]
**Date:** [Current Date]
**Prepared by:** [Your Name/Company]

## Executive Summary
[Brief overview of the proposed software solution and its key benefits]

## Project Scope
### Objectives
- [Primary objective 1]
- [Primary objective 2]
- [Primary objective 3]

### Deliverables
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

## Technical Requirements
### Technology Stack
- **Frontend:** [e.g., React, Vue.js, Angular]
- **Backend:** [e.g., Node.js, Python, Java]
- **Database:** [e.g., PostgreSQL, MongoDB, MySQL]
- **Infrastructure:** [e.g., AWS, Azure, Google Cloud]

### Features
1. **[Feature 1]**
   - Description and functionality

2. **[Feature 2]**
   - Description and functionality

3. **[Feature 3]**
   - Description and functionality

## Timeline
| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Planning & Design | [X weeks] | Wireframes, Technical Specs |
| Development Phase 1 | [X weeks] | Core Features |
| Development Phase 2 | [X weeks] | Advanced Features |
| Testing & QA | [X weeks] | Bug Fixes, Performance Testing |
| Deployment | [X weeks] | Live Application |

## Budget Estimate
- Development: $[Amount]
- Testing: $[Amount]
- Deployment: $[Amount]
- **Total:** $[Total Amount]

## Terms & Conditions
- Payment schedule: [e.g., 50% upfront, 50% on completion]
- Revision limits: [Number of revisions included]
- Support period: [Duration of post-launch support]

## Next Steps
1. Review and approve this proposal
2. Sign development contract
3. Begin project kickoff meeting
4. Start development phase

---
*This proposal is valid for [30 days] from the date above.*`
	},
	{
		id: "project-proposal",
		label: "Project Proposal",
		imageUrl: "/project-proposal.svg",
		initialContent: `# Project Proposal

## Project Information
**Project Title:** [Your Project Title]
**Submitted to:** [Recipient Name/Organization]
**Submitted by:** [Your Name]
**Date:** [Current Date]

## Executive Summary
[Provide a concise overview of your project, including the problem it addresses, your proposed solution, and expected outcomes. Keep this section brief but compelling.]

## Problem Statement
[Clearly define the problem or opportunity that your project addresses. Include relevant background information and explain why this issue needs to be addressed now.]

## Project Objectives
### Primary Objectives
- [Objective 1: Specific, measurable goal]
- [Objective 2: Specific, measurable goal]
- [Objective 3: Specific, measurable goal]

### Success Metrics
- [How you will measure success]
- [Key performance indicators]
- [Expected outcomes]

## Proposed Solution
[Describe your proposed approach to addressing the problem. Include methodology, key activities, and how your solution is unique or better than alternatives.]

### Key Components
1. **[Component 1]**
   - Description and purpose

2. **[Component 2]**
   - Description and purpose

3. **[Component 3]**
   - Description and purpose

## Implementation Plan
### Phase 1: [Phase Name] ([Duration])
- [Key activities and milestones]

### Phase 2: [Phase Name] ([Duration])
- [Key activities and milestones]

### Phase 3: [Phase Name] ([Duration])
- [Key activities and milestones]

## Resource Requirements
### Personnel
- [Role 1]: [Description of responsibilities]
- [Role 2]: [Description of responsibilities]

### Equipment/Materials
- [Item 1]: [Purpose and cost]
- [Item 2]: [Purpose and cost]

### Budget Summary
| Category | Amount |
|----------|--------|
| Personnel | $[Amount] |
| Equipment | $[Amount] |
| Materials | $[Amount] |
| Other | $[Amount] |
| **Total** | **$[Total]** |

## Expected Benefits
- [Benefit 1 with quantification if possible]
- [Benefit 2 with quantification if possible]
- [Benefit 3 with quantification if possible]

## Risk Assessment
| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|-------------------|
| [Risk 1] | [Low/Med/High] | [Low/Med/High] | [How to address] |
| [Risk 2] | [Low/Med/High] | [Low/Med/High] | [How to address] |

## Conclusion
[Summarize why this project should be approved and funded. Reiterate the key benefits and your capability to deliver results.]

## Appendices
- [Supporting documents, research, references]
- [Team credentials and experience]
- [Detailed budget breakdown]`
	},
	{
		id: "business-letter",
		label: "Business Letter",
		imageUrl: "/business-letter.svg",
		initialContent: `[Your Name]
[Your Title]
[Your Company]
[Your Address]
[City, State ZIP Code]
[Your Email]
[Your Phone Number]

[Date]

[Recipient's Name]
[Recipient's Title]
[Company Name]
[Address]
[City, State ZIP Code]

Dear [Mr./Ms./Dr. Last Name],

[Opening paragraph: State the purpose of your letter clearly and concisely. Mention how you learned about the recipient or company if relevant.]

[Body paragraph 1: Provide details, background information, or context. If you're making a request, explain why it's important. If you're providing information, organize it logically.]

[Body paragraph 2: Continue with additional details, supporting arguments, or evidence. If appropriate, mention benefits to the recipient or their organization.]

[Body paragraph 3: If needed, include a third paragraph with further details, examples, or call-to-action items.]

[Closing paragraph: Summarize your main points, restate your request or purpose, and indicate next steps. Thank the recipient for their time and consideration.]

Sincerely,

[Your Signature]
[Your Typed Name]

Enclosures: [If applicable, list any documents attached]
cc: [If applicable, list others receiving copies]`
	},
	{
		id: "resume",
		label: "Resume",
		imageUrl: "/resume.svg",
		initialContent: `# [Your Full Name]

**[Your Professional Title]**

📧 [your.email@example.com] | 📱 [Your Phone Number] | 🌐 [LinkedIn Profile] | 📍 [City, State]

---

## Professional Summary
[Write 2-3 sentences highlighting your key qualifications, years of experience, and what you bring to potential employers. Focus on your strongest skills and achievements.]

---

## Work Experience

### [Job Title] | [Company Name] | [City, State]
*[Start Date] – [End Date]*

- [Achievement-focused bullet point with quantifiable results]
- [Another accomplishment that demonstrates impact]
- [Key responsibility that shows relevant skills]
- [Additional achievement with metrics when possible]

### [Previous Job Title] | [Company Name] | [City, State]
*[Start Date] – [End Date]*

- [Achievement-focused bullet point with quantifiable results]
- [Another accomplishment that demonstrates impact]
- [Key responsibility that shows relevant skills]

### [Earlier Job Title] | [Company Name] | [City, State]
*[Start Date] – [End Date]*

- [Achievement-focused bullet point with quantifiable results]
- [Another accomplishment that demonstrates impact]

---

## Education

### [Degree Type] in [Field of Study]
**[University Name]** | [City, State] | [Graduation Year]
- [Relevant coursework, honors, or achievements]
- [GPA if above 3.5]

---

## Skills

**Technical Skills:** [List relevant technical skills, software, programming languages, etc.]

**Core Competencies:** [List soft skills and professional abilities]

**Languages:** [List languages and proficiency levels]

---

## Projects & Achievements

### [Project Name] | [Year]
- [Brief description of project and your role]
- [Key outcomes or results achieved]

### [Another Project/Achievement] | [Year]
- [Brief description and impact]

---

## Certifications
- [Certification Name] - [Issuing Organization] ([Year])
- [Another Certification] - [Issuing Organization] ([Year])

---

## Additional Information
- [Professional memberships, volunteer work, or other relevant information]
- [Awards or recognition received]`
	},
	{
		id: "cover-letter",
		label: "Cover Letter",
		imageUrl: "/cover-letter.svg",
		initialContent: `[Your Name]
[Your Address]
[City, State ZIP Code]
[Your Email]
[Your Phone Number]

[Date]

[Hiring Manager's Name]
[Company Name]
[Address]
[City, State ZIP Code]

Dear [Hiring Manager's Name / Dear Hiring Manager],

**Opening Paragraph:**
I am writing to express my strong interest in the [Position Title] role at [Company Name]. [Mention where you found the job posting or if someone referred you]. With [number] years of experience in [relevant field/industry], I am excited about the opportunity to contribute to [specific company goal or project mentioned in job posting].

**Body Paragraph 1 - Your Qualifications:**
In my current role as [Current Position] at [Current Company], I have [specific achievement or responsibility that directly relates to the job requirements]. For example, [provide a concrete example with quantifiable results]. This experience has strengthened my skills in [relevant skills mentioned in job posting] and prepared me to excel in the challenges described in your job listing.

**Body Paragraph 2 - Value You Bring:**
What particularly draws me to [Company Name] is [specific reason related to company values, mission, or recent news]. I believe my background in [relevant area] and passion for [relevant field/cause] would allow me to make meaningful contributions to your team. In my previous role, I [another relevant achievement or project that shows your potential value to this employer].

**Body Paragraph 3 - Knowledge of Company/Role:**
I am impressed by [Company Name]'s [specific initiative, product, value, or recent achievement]. Your commitment to [relevant company value or goal] aligns perfectly with my professional values and career objectives. I am particularly excited about the opportunity to [mention specific aspect of the role you're enthusiastic about].

**Closing Paragraph:**
Thank you for considering my application. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to [Company Name]'s continued success. I look forward to hearing from you and am available for an interview at your convenience.

Sincerely,
[Your Signature]
[Your Typed Name]

---

*Attachment: Resume*`
	},
	{
		id: "letter",
		label: "Letter",
		imageUrl: "/letter.svg",
		initialContent: `[Your Name]
[Your Address]
[City, State ZIP Code]
[Your Email]
[Your Phone Number]

[Date]

[Recipient's Name]
[Recipient's Address]
[City, State ZIP Code]

Dear [Recipient's Name / Dear Friend],

[Opening paragraph: Begin with a warm greeting and state the purpose of your letter. This could be to catch up, share news, express gratitude, or address a specific matter.]

[Body paragraph 1: Share your main message, news, or thoughts. Be personal and genuine in your tone. If you're writing to catch up, mention what's been happening in your life or ask about theirs.]

[Body paragraph 2: Continue with additional thoughts, details, or questions. This is where you can elaborate on your main points or share more personal reflections.]

[Body paragraph 3: If needed, include additional information, future plans, or express your feelings about the relationship or situation you're discussing.]

[Closing paragraph: Wrap up your letter with final thoughts, express your desire to hear back (if applicable), and end on a positive note. Thank them if appropriate.]

[Closing],
[Your Signature]
[Your Typed Name]

P.S. [Optional postscript for any additional thoughts or casual remarks]`
	}
];
