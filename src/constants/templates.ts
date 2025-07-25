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
		initialContent: `<h1>Software Development Proposal</h1>

<h2>Project Overview</h2>
<p><strong>Project Name:</strong> [Your Project Name]<br>
<strong>Client:</strong> [Client Name]<br>
<strong>Date:</strong> [Current Date]<br>
<strong>Prepared by:</strong> [Your Name/Company]</p>

<h2>Executive Summary</h2>
<p>[Brief overview of the proposed software solution and its key benefits]</p>

<h2>Project Scope</h2>
<h3>Objectives</h3>
<ul>
<li>[Primary objective 1]</li>
<li>[Primary objective 2]</li>
<li>[Primary objective 3]</li>
</ul>

<h3>Deliverables</h3>
<ul>
<li>[Deliverable 1]</li>
<li>[Deliverable 2]</li>
<li>[Deliverable 3]</li>
</ul>

<h2>Technical Requirements</h2>
<h3>Technology Stack</h3>
<ul>
<li><strong>Frontend:</strong> [e.g., React, Vue.js, Angular]</li>
<li><strong>Backend:</strong> [e.g., Node.js, Python, Java]</li>
<li><strong>Database:</strong> [e.g., PostgreSQL, MongoDB, MySQL]</li>
<li><strong>Infrastructure:</strong> [e.g., AWS, Azure, Google Cloud]</li>
</ul>

<h3>Features</h3>
<ol>
<li><strong>[Feature 1]</strong><br>
Description and functionality</li>
<li><strong>[Feature 2]</strong><br>
Description and functionality</li>
<li><strong>[Feature 3]</strong><br>
Description and functionality</li>
</ol>

<h2>Timeline</h2>
<table border="1" cellpadding="5" cellspacing="0">
<thead>
<tr>
<th>Phase</th>
<th>Duration</th>
<th>Deliverables</th>
</tr>
</thead>
<tbody>
<tr>
<td>Planning & Design</td>
<td>[X weeks]</td>
<td>Wireframes, Technical Specs</td>
</tr>
<tr>
<td>Development Phase 1</td>
<td>[X weeks]</td>
<td>Core Features</td>
</tr>
<tr>
<td>Development Phase 2</td>
<td>[X weeks]</td>
<td>Advanced Features</td>
</tr>
<tr>
<td>Testing & QA</td>
<td>[X weeks]</td>
<td>Bug Fixes, Performance Testing</td>
</tr>
<tr>
<td>Deployment</td>
<td>[X weeks]</td>
<td>Live Application</td>
</tr>
</tbody>
</table>

<h2>Budget Estimate</h2>
<ul>
<li>Development: $[Amount]</li>
<li>Testing: $[Amount]</li>
<li>Deployment: $[Amount]</li>
<li><strong>Total:</strong> $[Total Amount]</li>
</ul>

<h2>Terms & Conditions</h2>
<ul>
<li>Payment schedule: [e.g., 50% upfront, 50% on completion]</li>
<li>Revision limits: [Number of revisions included]</li>
<li>Support period: [Duration of post-launch support]</li>
</ul>

<h2>Next Steps</h2>
<ol>
<li>Review and approve this proposal</li>
<li>Sign development contract</li>
<li>Begin project kickoff meeting</li>
<li>Start development phase</li>
</ol>

<hr>
<p><em>This proposal is valid for [30 days] from the date above.</em></p>`
	},
	{
		id: "project-proposal",
		label: "Project Proposal",
		imageUrl: "/project-proposal.svg",
		initialContent: `<h1>Project Proposal</h1>

<h2>Project Information</h2>
<p><strong>Project Title:</strong> [Your Project Title]<br>
<strong>Submitted to:</strong> [Recipient Name/Organization]<br>
<strong>Submitted by:</strong> [Your Name]<br>
<strong>Date:</strong> [Current Date]</p>

<h2>Executive Summary</h2>
<p>[Provide a concise overview of your project, including the problem it addresses, your proposed solution, and expected outcomes. Keep this section brief but compelling.]</p>

<h2>Problem Statement</h2>
<p>[Clearly define the problem or opportunity that your project addresses. Include relevant background information and explain why this issue needs to be addressed now.]</p>

<h2>Project Objectives</h2>
<h3>Primary Objectives</h3>
<ul>
<li>[Objective 1: Specific, measurable goal]</li>
<li>[Objective 2: Specific, measurable goal]</li>
<li>[Objective 3: Specific, measurable goal]</li>
</ul>

<h3>Success Metrics</h3>
<ul>
<li>[How you will measure success]</li>
<li>[Key performance indicators]</li>
<li>[Expected outcomes]</li>
</ul>

<h2>Proposed Solution</h2>
<p>[Describe your proposed approach to addressing the problem. Include methodology, key activities, and how your solution is unique or better than alternatives.]</p>

<h3>Key Components</h3>
<ol>
<li><strong>[Component 1]</strong><br>
Description and purpose</li>
<li><strong>[Component 2]</strong><br>
Description and purpose</li>
<li><strong>[Component 3]</strong><br>
Description and purpose</li>
</ol>

<h2>Implementation Plan</h2>
<h3>Phase 1: [Phase Name] ([Duration])</h3>
<ul>
<li>[Key activities and milestones]</li>
</ul>

<h3>Phase 2: [Phase Name] ([Duration])</h3>
<ul>
<li>[Key activities and milestones]</li>
</ul>

<h3>Phase 3: [Phase Name] ([Duration])</h3>
<ul>
<li>[Key activities and milestones]</li>
</ul>

<h2>Resource Requirements</h2>
<h3>Personnel</h3>
<ul>
<li>[Role 1]: [Description of responsibilities]</li>
<li>[Role 2]: [Description of responsibilities]</li>
</ul>

<h3>Equipment/Materials</h3>
<ul>
<li>[Item 1]: [Purpose and cost]</li>
<li>[Item 2]: [Purpose and cost]</li>
</ul>

<h3>Budget Summary</h3>
<table border="1" cellpadding="5" cellspacing="0">
<thead>
<tr>
<th>Category</th>
<th>Amount</th>
</tr>
</thead>
<tbody>
<tr>
<td>Personnel</td>
<td>$[Amount]</td>
</tr>
<tr>
<td>Equipment</td>
<td>$[Amount]</td>
</tr>
<tr>
<td>Materials</td>
<td>$[Amount]</td>
</tr>
<tr>
<td>Other</td>
<td>$[Amount]</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>$[Total]</strong></td>
</tr>
</tbody>
</table>

<h2>Expected Benefits</h2>
<ul>
<li>[Benefit 1 with quantification if possible]</li>
<li>[Benefit 2 with quantification if possible]</li>
<li>[Benefit 3 with quantification if possible]</li>
</ul>

<h2>Risk Assessment</h2>
<table border="1" cellpadding="5" cellspacing="0">
<thead>
<tr>
<th>Risk</th>
<th>Probability</th>
<th>Impact</th>
<th>Mitigation Strategy</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Risk 1]</td>
<td>[Low/Med/High]</td>
<td>[Low/Med/High]</td>
<td>[How to address]</td>
</tr>
<tr>
<td>[Risk 2]</td>
<td>[Low/Med/High]</td>
<td>[Low/Med/High]</td>
<td>[How to address]</td>
</tr>
</tbody>
</table>

<h2>Conclusion</h2>
<p>[Summarize why this project should be approved and funded. Reiterate the key benefits and your capability to deliver results.]</p>

<h2>Appendices</h2>
<ul>
<li>[Supporting documents, research, references]</li>
<li>[Team credentials and experience]</li>
<li>[Detailed budget breakdown]</li>
</ul>`
	},
	{
		id: "business-letter",
		label: "Business Letter",
		imageUrl: "/business-letter.svg",
		initialContent: `<p>[Your Name]<br>
[Your Title]<br>
[Your Company]<br>
[Your Address]<br>
[City, State ZIP Code]<br>
[Your Email]<br>
[Your Phone Number]</p>

<p>[Date]</p>

<p>[Recipient's Name]<br>
[Recipient's Title]<br>
[Company Name]<br>
[Address]<br>
[City, State ZIP Code]</p>

<p>Dear [Mr./Ms./Dr. Last Name],</p>

<p>[Opening paragraph: State the purpose of your letter clearly and concisely. Mention how you learned about the recipient or company if relevant.]</p>

<p>[Body paragraph 1: Provide details, background information, or context. If you're making a request, explain why it's important. If you're providing information, organize it logically.]</p>

<p>[Body paragraph 2: Continue with additional details, supporting arguments, or evidence. If appropriate, mention benefits to the recipient or their organization.]</p>

<p>[Body paragraph 3: If needed, include a third paragraph with further details, examples, or call-to-action items.]</p>

<p>[Closing paragraph: Summarize your main points, restate your request or purpose, and indicate next steps. Thank the recipient for their time and consideration.]</p>

<p>Sincerely,</p>

<p>[Your Signature]<br>
[Your Typed Name]</p>

<p>Enclosures: [If applicable, list any documents attached]<br>
cc: [If applicable, list others receiving copies]</p>`
	},
	{
		id: "resume",
		label: "Resume",
		imageUrl: "/resume.svg",
		initialContent: `<h1>[Your Full Name]</h1>

<p><strong>[Your Professional Title]</strong></p>

<p>📧 [your.email@example.com] | 📱 [Your Phone Number] | 🌐 [LinkedIn Profile] | 📍 [City, State]</p>

<hr>

<h2>Professional Summary</h2>
<p>[Write 2-3 sentences highlighting your key qualifications, years of experience, and what you bring to potential employers. Focus on your strongest skills and achievements.]</p>

<hr>

<h2>Work Experience</h2>

<h3>[Job Title] | [Company Name] | [City, State]</h3>
<p><em>[Start Date] – [End Date]</em></p>

<ul>
<li>[Achievement-focused bullet point with quantifiable results]</li>
<li>[Another accomplishment that demonstrates impact]</li>
<li>[Key responsibility that shows relevant skills]</li>
<li>[Additional achievement with metrics when possible]</li>
</ul>

<h3>[Previous Job Title] | [Company Name] | [City, State]</h3>
<p><em>[Start Date] – [End Date]</em></p>

<ul>
<li>[Achievement-focused bullet point with quantifiable results]</li>
<li>[Another accomplishment that demonstrates impact]</li>
<li>[Key responsibility that shows relevant skills]</li>
</ul>

<h3>[Earlier Job Title] | [Company Name] | [City, State]</h3>
<p><em>[Start Date] – [End Date]</em></p>

<ul>
<li>[Achievement-focused bullet point with quantifiable results]</li>
<li>[Another accomplishment that demonstrates impact]</li>
</ul>

<hr>

<h2>Education</h2>

<h3>[Degree Type] in [Field of Study]</h3>
<p><strong>[University Name]</strong> | [City, State] | [Graduation Year]</p>
<ul>
<li>[Relevant coursework, honors, or achievements]</li>
<li>[GPA if above 3.5]</li>
</ul>

<hr>

<h2>Skills</h2>

<p><strong>Technical Skills:</strong> [List relevant technical skills, software, programming languages, etc.]</p>

<p><strong>Core Competencies:</strong> [List soft skills and professional abilities]</p>

<p><strong>Languages:</strong> [List languages and proficiency levels]</p>

<hr>

<h2>Projects & Achievements</h2>

<h3>[Project Name] | [Year]</h3>
<ul>
<li>[Brief description of project and your role]</li>
<li>[Key outcomes or results achieved]</li>
</ul>

<h3>[Another Project/Achievement] | [Year]</h3>
<ul>
<li>[Brief description and impact]</li>
</ul>

<hr>

<h2>Certifications</h2>
<ul>
<li>[Certification Name] - [Issuing Organization] ([Year])</li>
<li>[Another Certification] - [Issuing Organization] ([Year])</li>
</ul>

<hr>

<h2>Additional Information</h2>
<ul>
<li>[Professional memberships, volunteer work, or other relevant information]</li>
<li>[Awards or recognition received]</li>
</ul>`
	},
	{
		id: "cover-letter",
		label: "Cover Letter",
		imageUrl: "/cover-letter.svg",
		initialContent: `<p>[Your Name]<br>
[Your Address]<br>
[City, State ZIP Code]<br>
[Your Email]<br>
[Your Phone Number]</p>

<p>[Date]</p>

<p>[Hiring Manager's Name]<br>
[Company Name]<br>
[Address]<br>
[City, State ZIP Code]</p>

<p>Dear [Hiring Manager's Name / Dear Hiring Manager],</p>

<p><strong>Opening Paragraph:</strong><br>
I am writing to express my strong interest in the [Position Title] role at [Company Name]. [Mention where you found the job posting or if someone referred you]. With [number] years of experience in [relevant field/industry], I am excited about the opportunity to contribute to [specific company goal or project mentioned in job posting].</p>

<p><strong>Body Paragraph 1 - Your Qualifications:</strong><br>
In my current role as [Current Position] at [Current Company], I have [specific achievement or responsibility that directly relates to the job requirements]. For example, [provide a concrete example with quantifiable results]. This experience has strengthened my skills in [relevant skills mentioned in job posting] and prepared me to excel in the challenges described in your job listing.</p>

<p><strong>Body Paragraph 2 - Value You Bring:</strong><br>
What particularly draws me to [Company Name] is [specific reason related to company values, mission, or recent news]. I believe my background in [relevant area] and passion for [relevant field/cause] would allow me to make meaningful contributions to your team. In my previous role, I [another relevant achievement or project that shows your potential value to this employer].</p>

<p><strong>Body Paragraph 3 - Knowledge of Company/Role:</strong><br>
I am impressed by [Company Name]'s [specific initiative, product, value, or recent achievement]. Your commitment to [relevant company value or goal] aligns perfectly with my professional values and career objectives. I am particularly excited about the opportunity to [mention specific aspect of the role you're enthusiastic about].</p>

<p><strong>Closing Paragraph:</strong><br>
Thank you for considering my application. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to [Company Name]'s continued success. I look forward to hearing from you and am available for an interview at your convenience.</p>

<p>Sincerely,<br>
[Your Signature]<br>
[Your Typed Name]</p>

<hr>

<p><em>Attachment: Resume</em></p>`
	},
	{
		id: "letter",
		label: "Letter",
		imageUrl: "/letter.svg",
		initialContent: `<p>[Your Name]<br>
[Your Address]<br>
[City, State ZIP Code]<br>
[Your Email]<br>
[Your Phone Number]</p>

<p>[Date]</p>

<p>[Recipient's Name]<br>
[Recipient's Address]<br>
[City, State ZIP Code]</p>

<p>Dear [Recipient's Name / Dear Friend],</p>

<p>[Opening paragraph: Begin with a warm greeting and state the purpose of your letter. This could be to catch up, share news, express gratitude, or address a specific matter.]</p>

<p>[Body paragraph 1: Share your main message, news, or thoughts. Be personal and genuine in your tone. If you're writing to catch up, mention what's been happening in your life or ask about theirs.]</p>

<p>[Body paragraph 2: Continue with additional thoughts, details, or questions. This is where you can elaborate on your main points or share more personal reflections.]</p>

<p>[Body paragraph 3: If needed, include additional information, future plans, or express your feelings about the relationship or situation you're discussing.]</p>

<p>[Closing paragraph: Wrap up your letter with final thoughts, express your desire to hear back (if applicable), and end on a positive note. Thank them if appropriate.]</p>

<p>[Closing],<br>
[Your Signature]<br>
[Your Typed Name]</p>

<p>P.S. [Optional postscript for any additional thoughts or casual remarks]</p>`
	}
];
