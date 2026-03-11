"use client";
import { useState, useMemo } from "react";

/* ═══ DESIGN TOKENS ═══ */
const V={bg:"#F7F5F0",card:"#FFFFFF",warm:"#F1EDE6",text:"#1A1A2E",mid:"#4A4A5A",lt:"#8A8A96",faint:"#B5B5BE",
teal:"#1B7A66",indigo:"#2D3561",coral:"#D05A40",plum:"#7D4E7B",amber:"#B8860B",olive:"#5E7A3A",slate:"#4A6670",
border:"#E6E3DB",shadow:"0 1px 4px rgba(26,26,46,0.04),0 6px 16px rgba(26,26,46,0.03)",
shadowH:"0 2px 8px rgba(26,26,46,0.06),0 12px 32px rgba(26,26,46,0.05)"};
const LEVELS=["Entry","Early-Career","Mid-Career","Senior","Leadership"];
const LEVEL_C=["#1B7A66","#2D3561","#D05A40","#7D4E7B","#B8860B"];
const SPACES_LIST=["Think Tank","Government","Dev Consulting","NGO / Civil Society","Corporate GAPA","Policy Communication","Multilateral / IO","Philanthropy / CSR","Legal & Regulatory","Social Enterprise","Academia","Political Strategy"];

/* ═══ 55 ROLE PROFILES ═══ */
const R=[
// THINK TANK (8)
{id:1,title:"Research Intern",space:"Think Tank",level:0,salary:"₹5–15K/mo (stipend)",desc:"Support senior researchers with literature reviews, data collection, citation management. First exposure to the policy research cycle at institutions like CEEW, CPR, or ORF.",skills:["Literature review","Data entry","Citation management","Basic Excel","Academic writing"],orgs:["CEEW","CPR","ORF","Vidhi","NIPFP"],req:"Undergrad or Master's student. Strong writing sample. Interest in a specific vertical.",next:[2,3],verticals:["Any"]},
{id:2,title:"Research Analyst",space:"Think Tank",level:0,salary:"₹4–7 LPA",desc:"Conduct primary and secondary research under guidance. Clean datasets, run basic quantitative analysis, draft sections of working papers and policy briefs. First full-time policy role for many graduates.",skills:["Stata/R basics","Policy brief drafting","Data cleaning","Qualitative coding","Presentation skills"],orgs:["CEEW","ICRIER","Brookings India","Carnegie India","CSEP","NCAER"],req:"Master's degree preferred. 0–2 years experience. Writing sample + quantitative test typical in hiring.",next:[3,4],verticals:["Climate","Digital","Health","Finance"]},
{id:3,title:"Programme Associate",space:"Think Tank",level:1,salary:"₹6–10 LPA",desc:"Manage specific research programmes end-to-end: coordinate with funders, organise stakeholder consultations, manage timelines, contribute to research outputs. Hybrid research + management role.",skills:["Project management","Grant reporting","Stakeholder engagement","Event management","Budget tracking","Report writing"],orgs:["ORF","TERI","IIHS","Takshashila","Gateway House"],req:"2–4 years experience. Demonstrated ability to manage multiple workstreams.",next:[4,5],verticals:["Any"]},
{id:4,title:"Fellow / Senior Researcher",space:"Think Tank",level:2,salary:"₹10–18 LPA",desc:"Lead research projects independently. Author working papers, present at consultations, engage with media. Beginning to build a public profile and citation record in your vertical.",skills:["Independent research design","Academic publishing","Media engagement","Policy recommendations","Quantitative analysis (advanced)","Stakeholder consultation"],orgs:["CPR","CEEW","ICRIER","Vidhi","MP-IDSA","NIPFP"],req:"5–8 years experience. Published work. Master's or PhD preferred. Deep vertical expertise.",next:[5,6],verticals:["Climate","Governance","Digital","Trade"]},
{id:5,title:"Senior Fellow / Director",space:"Think Tank",level:3,salary:"₹18–35 LPA",desc:"Shape the research agenda of a programme or centre. Manage teams of 5–15 researchers. Represent the institution in government consultations, international conferences, and media.",skills:["Research leadership","Team management","Fundraising","Institutional strategy","Public intellectual presence","Cross-sector convening"],orgs:["CPR","CEEW","ORF","ICRIER","CSEP"],req:"10+ years. Strong publication record. Network across government, multilateral, and academic circles.",next:[6],verticals:["Any"]},
{id:6,title:"CEO / President / Director-General",space:"Think Tank",level:4,salary:"₹35–80+ LPA",desc:"Lead the entire institution. Set strategic direction, manage Board relations, fundraise at scale, represent the institution nationally and internationally. Rare role, typically held for 5–15 years.",skills:["Institutional leadership","Board governance","Strategic fundraising","Public representation","Organisational development"],orgs:["CEEW (Arunabha Ghosh)","CPR","ORF","ICRIER"],req:"15+ years. National reputation. Extensive institutional and donor network.",next:[],verticals:["Any"]},
// GOVERNMENT (7)
{id:7,title:"LAMP / Parliamentary Fellow",space:"Government",level:0,salary:"₹23K/mo (LAMP); varies",desc:"Work directly with a Member of Parliament for 10–11 months. Draft questions, prepare speeches, research legislative issues. Unparalleled exposure to how Parliament actually functions.",skills:["Legislative research","Parliamentary procedure","Brief writing","Political communication","Rapid synthesis"],orgs:["PRS Legislative Research","PPGF (Mukherjee)"],req:"Graduate degree. Under 26 typically. Rigorous selection (10,000+ applicants for ~40 LAMP spots).",next:[8,9,10],verticals:["Governance","Any"]},
{id:8,title:"CM Fellow / Good Governance Associate",space:"Government",level:0,salary:"₹30K–1.5L/mo by state",desc:"Posted to district administration in partnership with state government. Work on scheme implementation, data-driven governance, and field-level problem-solving. 8+ states now run variants.",skills:["District governance","Data analysis","Field research","Stakeholder coordination","Government scheme knowledge","Presentation to bureaucrats"],orgs:["Haryana CMGGA","Maharashtra CM Fellowship","Bihar CM Fellowship","Gujarat","Chhattisgarh"],req:"Graduate/postgraduate. Age varies by state. Often requires domicile (Bihar). 1–3 year commitment.",next:[9,10,15],verticals:["Governance","Education","Health","Rural"]},
{id:9,title:"Young Professional (NITI Aayog)",space:"Government",level:1,salary:"₹8.4 LPA (₹70K/mo)",desc:"Two-year contract at India's premier policy think tank within government. Support verticals like health, education, SDGs, infrastructure. Extraordinary access to Secretary-level meetings and PM-chaired sessions.",skills:["Policy analysis","Government file systems","Data presentation","Inter-ministerial coordination","Note drafting"],orgs:["NITI Aayog"],req:"Under 30 typically. Master's preferred. Domain expertise in a vertical. Highly competitive.",next:[10,15,24],verticals:["Any"]},
{id:10,title:"Consultant / Specialist (Government)",space:"Government",level:2,salary:"₹12–25 LPA",desc:"Contractual role in ministries, NITI Aayog, or state govts. Often funded by World Bank, UNDP, or bilateral agencies. Bring specific domain expertise that the permanent bureaucracy lacks.",skills:["Technical domain expertise","Policy drafting","Stakeholder management","Government processes","Report writing (government style)"],orgs:["Any central ministry","State govts","DARPG","MoHFW","MeitY"],req:"5–10 years domain experience. Often requires specific technical skills (health, digital, finance).",next:[11],verticals:["Any"]},
{id:11,title:"IAS / Senior Government Officer",space:"Government",level:3,salary:"₹15–30 LPA (+ benefits)",desc:"Career civil servant through UPSC. District Magistrate, Commissioner, Secretary-level positions. Extraordinary power and scale. Transfers and political dynamics are constant realities.",skills:["Administrative leadership","Political navigation","Crisis management","File and noting system mastery","Public administration","Hindi/regional language"],orgs:["All state and central govt positions"],req:"UPSC Civil Services Examination. 2–4 years preparation typical. One of the most competitive exams globally.",next:[],verticals:["Any"]},
// DEV CONSULTING (6)
{id:12,title:"Research / Business Analyst",space:"Dev Consulting",level:0,salary:"₹5–10 LPA",desc:"Entry-level at firms like Sattva, Samagra, smaller consultancies. Conduct secondary research, build Excel models, draft slides, support senior consultants on client engagements.",skills:["Secondary research","Excel modelling","Slide design","MECE thinking","Client communication"],orgs:["Sattva","Samagra","Samhita","Think Through","Access Livelihoods"],req:"Bachelor's or Master's. Strong analytical skills. Consulting aptitude (case interview typical).",next:[13,14],verticals:["Any"]},
{id:13,title:"Associate / Senior Associate",space:"Dev Consulting",level:1,salary:"₹10–20 LPA",desc:"Own workstreams within engagements. Lead primary research (FGDs, KIIs, surveys). Present findings to mid-level clients. Beginning to develop sector expertise and client relationships.",skills:["Primary research design","FGD/KII facilitation","Data analysis","Client management","Proposal writing","Sector expertise"],orgs:["Dalberg","FSG","IDinsight","Sattva","IPE Global","BCG Social Impact"],req:"2–4 years experience. MPP/MBA from recognized programme OR strong consulting background.",next:[14],verticals:["Any"]},
{id:14,title:"Manager / Engagement Manager",space:"Dev Consulting",level:2,salary:"₹18–35 LPA",desc:"Manage entire client engagements end-to-end. Lead teams of 3–6. Shape project methodology, ensure quality, present to senior clients (Principal Secretaries, Foundation heads). Developing a sector reputation.",skills:["Engagement management","Team leadership","Quality assurance","Senior client relations","Business development","Methodology design"],orgs:["Dalberg","FSG","Deloitte GPS","EY-Parthenon","McKinsey Social Sector","PwC"],req:"5–8 years. Track record of high-quality deliverables. Sector depth in at least one vertical.",next:[15],verticals:["Any"]},
{id:15,title:"Principal / Partner",space:"Dev Consulting",level:3,salary:"₹35–80+ LPA",desc:"Drive business development, shape firm strategy, lead thought leadership. Manage a portfolio of client relationships. P&L responsibility for a practice area or geography.",skills:["Business development","Thought leadership","Sector eminence","P&L management","Institutional relationships","Strategic advisory"],orgs:["Dalberg","FSG","Bridgespan","Deloitte GPS","McKinsey"],req:"10+ years. Deep sector relationships. Revenue generation track record.",next:[],verticals:["Any"]},
// NGO / CIVIL SOCIETY (6)
{id:16,title:"Field Coordinator / Community Organiser",space:"NGO / Civil Society",level:0,salary:"₹2.5–5 LPA",desc:"Work directly in villages, blocks, or urban slums. Mobilise communities, facilitate meetings, collect data, support programme delivery. The most ground-level role in the ecosystem.",skills:["Community mobilisation","Local language fluency","Data collection","Facilitation","RTI basics","Government scheme knowledge"],orgs:["PRADAN","Jan Sahas","Gram Vaani","SEWA","Action Aid"],req:"Bachelor's degree. Local language essential. Willingness to live in rural/peri-urban areas.",next:[17,18],verticals:["Rural","Gender","Governance","Health","Education"]},
{id:17,title:"Programme Manager",space:"NGO / Civil Society",level:1,salary:"₹5–10 LPA",desc:"Manage a programme across 5–20 blocks or districts. Supervise field teams, track outcomes, manage budgets, report to donors. Bridge between the ground reality and institutional expectations.",skills:["Programme design","Team management","M&E","Budget management","Donor reporting","Field supervision"],orgs:["Pratham","Akshara","WaterAid","Room to Read","Teach For India","Azim Premji Foundation"],req:"3–5 years field experience. Master's in social work, development, or policy often valued.",next:[18,19],verticals:["Education","Health","Rural","Water","Gender"]},
{id:18,title:"State / Regional Director",space:"NGO / Civil Society",level:2,salary:"₹10–18 LPA",desc:"Oversee all programmes in a state or region. Manage 20–100+ staff. Handle state government relationships, lead fundraising for the geography. Strategic and operational leadership combined.",skills:["Strategic leadership","Government relations","Large team management","Fundraising","Advocacy","Context-specific expertise"],orgs:["Pratham","Oxfam India","CRY","HelpAge","The/Nudge"],req:"8–12 years. Deep state-level networks. Track record of programme scale-up.",next:[19],verticals:["Any"]},
{id:19,title:"CEO / Executive Director (NGO)",space:"NGO / Civil Society",level:4,salary:"₹18–40+ LPA",desc:"Lead the entire organisation. Board relations, strategic direction, national fundraising, partnerships, public representation. Often founder-led in Indian context.",skills:["Organisational leadership","Board governance","National fundraising","Public communication","Sector thought leadership"],orgs:["Pratham (Rukmini Banerji)","SEWA","Dasra","Ashoka India"],req:"15+ years. National reputation. Deep institutional relationships.",next:[],verticals:["Any"]},
// CORPORATE GAPA (5)
{id:20,title:"Policy Analyst (Corporate)",space:"Corporate GAPA",level:0,salary:"₹8–15 LPA",desc:"Track legislative and regulatory developments across central and state governments. Draft monitoring reports, maintain regulatory trackers, support position paper development.",skills:["Regulatory tracking","Legislative monitoring","Report writing","Stakeholder mapping","Research"],orgs:["Google India","Meta India","Amazon","Uber","Flipkart","PhonePe"],req:"Law degree or MPP/MA. 0–2 years experience. Understanding of Indian legislative/regulatory landscape.",next:[21],verticals:["Digital","Finance","Trade"]},
{id:21,title:"Policy Manager",space:"Corporate GAPA",level:2,salary:"₹20–35 LPA",desc:"Own a policy portfolio (e.g., data protection, content regulation, competition law). Draft position papers, engage with government officials and industry bodies, coordinate with global policy teams.",skills:["Position paper writing","Government engagement","Industry body coordination","Cross-functional leadership","Regulatory analysis","Public communications"],orgs:["Google","Meta","Amazon","Microsoft","Apple","Netflix","Mastercard","Visa"],req:"5–8 years in policy, law, or government. Deep understanding of Indian regulatory landscape in relevant vertical.",next:[22],verticals:["Digital","Finance","Trade","Health"]},
{id:22,title:"Director, Public Policy / Govt Affairs",space:"Corporate GAPA",level:3,salary:"₹40–70 LPA",desc:"Lead a portfolio of policy issues for India. Manage a team of policy managers and analysts. Direct engagement with Joint Secretary / Secretary level officials. Represent company at high-level convenings.",skills:["Senior government relations","Strategic communications","Team leadership","Crisis management","Regulatory strategy","Media engagement"],orgs:["Google India","Meta India","Amazon India","Reliance Industries","Tata Group"],req:"10–15 years. Extensive government and industry network. Track record of navigating complex regulatory issues.",next:[23],verticals:["Digital","Finance","Trade"]},
{id:23,title:"VP / Head of Public Policy (India / APAC)",space:"Corporate GAPA",level:4,salary:"₹80 LPA – ₹1.5 Cr+",desc:"The most senior policy role in India for a major corporation. Shape the company's entire government engagement strategy. Direct access to CEO and global C-suite. Represent the company at the highest levels.",skills:["Executive leadership","Geopolitical intelligence","Board-level communication","Regulatory foresight","Institutional reputation management"],orgs:["Google","Meta","Amazon","Microsoft","Reliance"],req:"15+ years. Deep institutional relationships across government, industry, and media. Political economy intuition.",next:[],verticals:["Digital","Trade"]},
// POLICY COMMS (4)
{id:24,title:"Content / Editorial Associate",space:"Policy Communication",level:0,salary:"₹4–7 LPA",desc:"Write, edit, and curate policy content for newsletters, social media, and websites. Manage submission pipelines. First step into the growing policy communication space.",skills:["Editing","Social media management","Newsletter tools (Substack, Mailchimp)","SEO basics","Content curation","CMS management"],orgs:["IDR","PPI","IndiaSpend","Down To Earth","Mongabay India"],req:"Strong writing portfolio. Understanding of policy landscape. Editorial sensibility.",next:[25,26],verticals:["Any"]},
{id:25,title:"Editor / Senior Editor",space:"Policy Communication",level:2,salary:"₹10–18 LPA",desc:"Commission articles, manage editorial calendar, develop thematic series, engage expert contributors. Shape the publication's intellectual identity and editorial standards.",skills:["Commissioning","Editorial strategy","Expert network building","Quality control","Long-form editing","Data visualisation direction"],orgs:["IDR","IndiaSpend","EPW","Article 14","Scroll","The Wire"],req:"5–8 years in journalism, editorial, or policy writing. Strong network of expert contributors.",next:[26],verticals:["Any"]},
{id:26,title:"Head of Content / Editor-in-Chief",space:"Policy Communication",level:3,salary:"₹18–30 LPA",desc:"Set editorial direction for an entire platform. Manage a team of editors and writers. Represent the publication at conferences and in media. Drive audience growth and engagement strategy.",skills:["Editorial leadership","Audience strategy","Revenue model design","Public speaking","Partnership development","Brand building"],orgs:["IDR","The Wire","Scroll","IndiaSpend","PPI"],req:"10+ years. Established editorial reputation. Vision for the intersection of policy and communication.",next:[],verticals:["Any"]},
// MULTILATERAL (5)
{id:27,title:"Consultant (UN / World Bank)",space:"Multilateral / IO",level:1,salary:"₹8–20 LPA (contract)",desc:"Short-term contracts (3–11 months) providing technical support on specific projects. The most common 'foot in the door' for multilateral careers. No benefits, no job security, but excellent exposure.",skills:["Technical writing (UN style)","Data analysis","Programme support","Log frame development","Concept note drafting"],orgs:["UNDP India","UNICEF India","World Bank","WHO India","FAO"],req:"Master's degree. 2–5 years domain experience. Ability to deliver under tight deadlines.",next:[28,29],verticals:["Health","Education","Climate","Gender"]},
{id:28,title:"National Officer (NO-B/C)",space:"Multilateral / IO",level:2,salary:"₹15–30 LPA",desc:"Full staff position within a UN agency's India office. Manage programme components, coordinate with government counterparts, lead technical assistance activities.",skills:["Programme management","Government coordination","M&E","Stakeholder engagement","Report writing","Technical domain expertise"],orgs:["UNDP","UNICEF","WHO","ILO","UN Women","UNFPA"],req:"5–8 years. Domain expertise. Understanding of government systems. Often recruited from consultant pool.",next:[29],verticals:["Health","Education","Climate","Gender","Governance"]},
{id:29,title:"International Professional (P-3/P-4)",space:"Multilateral / IO",level:3,salary:"₹30–55 LPA",desc:"International staff grade. Can be posted anywhere globally. Lead programme design, manage large teams, represent the agency in high-level government dialogues.",skills:["Strategic programme leadership","Diplomatic engagement","Cross-country coordination","Resource mobilisation","Policy advocacy","Team management"],orgs:["UNDP","UNICEF","WHO","World Bank","ADB"],req:"8–12 years. Often requires international experience. PhD valued. Deep technical + managerial expertise.",next:[30],verticals:["Any"]},
{id:30,title:"Country Representative / Director",space:"Multilateral / IO",level:4,salary:"₹50–90+ LPA",desc:"Lead an entire UN agency's operations in a country. Manage multi-million dollar portfolios. Interface with the highest levels of government. Rare, prestigious role.",skills:["Country-level leadership","Government relations (ministerial)","Portfolio management","Diplomatic representation","Fundraising"],orgs:["UNDP","UNICEF","WHO","FAO","ILO"],req:"15+ years international development experience. Typically requires postings in multiple countries.",next:[],verticals:["Any"]},
// PHILANTHROPY / CSR (4)
{id:31,title:"Programme Associate (Foundation)",space:"Philanthropy / CSR",level:0,salary:"₹6–10 LPA",desc:"Support grant management processes. Conduct due diligence on potential grantees. Monitor funded projects. Compile portfolio reports for leadership.",skills:["Due diligence","Grant administration","M&E basics","Report compilation","Organisation research"],orgs:["Tata Trusts","EdelGive","Dasra","Rohini Nilekani Philanthropies"],req:"Master's degree. 1–3 years in development sector. Understanding of NGO landscape.",next:[32,33],verticals:["Any"]},
{id:32,title:"Programme Officer / CSR Manager",space:"Philanthropy / CSR",level:2,salary:"₹12–22 LPA",desc:"Manage a portfolio of grants or CSR investments. Conduct site visits, assess impact, develop funding strategies for a thematic area. Bridge between grantees and institutional leadership.",skills:["Portfolio management","Impact assessment","Grantee relationship management","Sector landscape mapping","Board presentations","Theory of change"],orgs:["Tata Trusts","Azim Premji Foundation","Infosys Foundation","Piramal Foundation","Godrej CSR","Wipro Foundation"],req:"5–8 years. Deep sector knowledge. Ability to assess organisational capacity and impact.",next:[33],verticals:["Education","Health","Rural","Climate"]},
{id:33,title:"Director / Head of Programmes",space:"Philanthropy / CSR",level:3,salary:"₹25–50+ LPA",desc:"Shape the entire grantmaking strategy. Manage a team of programme officers. Present to Board. Lead landscape studies that determine where hundreds of crores get deployed.",skills:["Strategic grantmaking","Board governance","Team leadership","Sector thought leadership","Blended finance","Systems-level thinking"],orgs:["Tata Trusts","Azim Premji Foundation","Reliance Foundation","Rohini Nilekani Philanthropies","CIFF India"],req:"12+ years. National reputation in at least one sector. Deep networks across the development ecosystem.",next:[],verticals:["Any"]},
// LEGAL & REGULATORY (5)
{id:34,title:"Legal Research Associate",space:"Legal & Regulatory",level:0,salary:"₹4–8 LPA",desc:"Research case law, draft legal briefs, support senior lawyers on PILs or regulatory filings. Often the starting point for law graduates interested in policy.",skills:["Legal research (Indian + comparative)","Case brief drafting","Citation management","Regulatory tracking","Legal writing"],orgs:["Vidhi","CLPR","HRLN","Internet Freedom Foundation","SFLC.in"],req:"LLB from a recognised law school. Law firm internship experience. Interest in public interest law.",next:[35,36],verticals:["Digital","Governance","Gender","Climate"]},
{id:35,title:"Policy Associate (Law Firm)",space:"Legal & Regulatory",level:1,salary:"₹8–18 LPA",desc:"Work in a law firm's regulatory or public policy practice. Advise corporate clients on compliance, draft regulatory submissions, track legislative developments.",skills:["Regulatory analysis","Compliance advisory","Client communication","Legal drafting","Sector-specific regulation"],orgs:["AZB & Partners","Trilegal","Cyril Amarchand","Khaitan & Co","Shardul Amarchand"],req:"LLB/LLM from top law school. 2–4 years. DPDP, competition, telecom, or environment specialisation.",next:[36,22],verticals:["Digital","Finance","Climate"]},
{id:36,title:"Senior Researcher / Programme Lead",space:"Legal & Regulatory",level:2,salary:"₹12–22 LPA",desc:"Lead a research programme at a legal policy organisation. Author reports that influence legislative drafting. Engage with parliamentary committees and regulatory bodies.",skills:["Legislative analysis","Report authorship","Regulatory body engagement","Parliamentary committee testimony","Team management","Public communication"],orgs:["Vidhi","CLPR","Internet Freedom Foundation","Daksh","PRS Legislative Research"],req:"5–8 years. Published legal/policy analysis. Network across regulatory bodies and judiciary.",next:[37],verticals:["Governance","Digital","Climate"]},
{id:37,title:"Director / Head of Practice",space:"Legal & Regulatory",level:3,salary:"₹25–45 LPA",desc:"Lead an entire practice area at a legal policy org or law firm. Shape advocacy strategy. Represent the institution in high-level consultations and media.",skills:["Practice leadership","Strategic litigation","Advocacy strategy","Institutional partnerships","Public interest law expertise"],orgs:["Vidhi","CLPR","HRLN","Major law firms' policy practices"],req:"10+ years. Deep expertise in a specific legal-policy intersection. National reputation.",next:[],verticals:["Governance","Digital"]},
// SOCIAL ENTERPRISE / IMPACT (4)
{id:38,title:"Associate / Analyst (Impact Fund)",space:"Social Enterprise",level:0,salary:"₹8–14 LPA",desc:"Source deals, conduct due diligence on social enterprises, build financial models, prepare investment committee memos. Entry into impact investing from the investment side.",skills:["Financial modelling","Due diligence","Market research","Impact measurement","Memo writing","Sector analysis"],orgs:["Aavishkaar","Omidyar Network","Acumen","Unitus Capital","Indian Impact Investors Council"],req:"MBA/CFA or strong finance background. Understanding of development sector. Interest in impact investing.",next:[39],verticals:["Finance","Education","Health","Climate","Rural"]},
{id:39,title:"Product / Programme Manager (GovTech)",space:"Social Enterprise",level:1,salary:"₹10–20 LPA",desc:"Build and manage technology products for governance: digital public goods, monitoring dashboards, citizen service platforms. Hybrid tech + policy role.",skills:["Product management","User research","Agile/Scrum","Government procurement","Design thinking","Data systems"],orgs:["eGov Foundation","EkStep","Dimagi","Haqdarshak","Samagra (tech)","OpenCity"],req:"Engineering or design background + policy interest. 2–5 years in product/tech. Government context understanding.",next:[40],verticals:["Digital","Governance","Health","Education"]},
{id:40,title:"VP / Director (Social Enterprise)",space:"Social Enterprise",level:3,salary:"₹25–50 LPA",desc:"Lead a major programme area or business unit at a scaled social enterprise. Manage large teams, drive strategy, interface with government clients and investors.",skills:["Strategic leadership","Government client management","Fundraising","Scale-up strategy","Team building","Impact reporting"],orgs:["CSF","EkStep","TechnoServe","Frontier Markets","Avanti Fellows"],req:"10+ years. Track record of scaling programmes or products. Sector + management expertise.",next:[],verticals:["Education","Health","Digital","Rural"]},
// ACADEMIA (3)
{id:41,title:"Teaching / Research Fellow",space:"Academia",level:1,salary:"₹6–12 LPA",desc:"Teach policy courses and conduct research at universities. Often the path for those with PhDs who want to train the next generation of policy professionals.",skills:["Curriculum design","Classroom teaching","Research methodology","Publication","Student mentoring"],orgs:["JSGP","Azim Premji University","Ashoka","TISS","IIT Delhi SPP","NLSIU"],req:"PhD or ABD. Strong publication record. Teaching experience valued.",next:[42],verticals:["Any"]},
{id:42,title:"Associate / Full Professor",space:"Academia",level:3,salary:"₹15–35 LPA",desc:"Tenured or tenure-track faculty at a policy school. Shape curriculum, supervise research students, contribute to national policy discourse through publications and consultations.",skills:["Advanced research","PhD supervision","Institutional governance","Grant acquisition","Public intellectual presence","Curriculum leadership"],orgs:["JNU","JSGP","Ashoka","IIM Bangalore","TISS","APU","NLSIU"],req:"PhD. 8+ years of research and teaching. Strong publication record in reputed journals.",next:[],verticals:["Any"]},
// POLITICAL STRATEGY (3)
{id:43,title:"Political Research Associate",space:"Political Strategy",level:0,salary:"₹4–8 LPA",desc:"Research electoral data, draft talking points, prepare constituency-level briefings for elected officials. A less visible but growing part of the policy ecosystem.",skills:["Electoral data analysis","Brief writing","Political communication","Constituency research","Media monitoring"],orgs:["PPGF","I-PAC","Political consulting firms","MP/MLA offices"],req:"Understanding of Indian political landscape. Data skills. Strong writing. Often recruited through Mukherjee Fellowship.",next:[44,45],verticals:["Governance"]},
{id:44,title:"Political Strategy Consultant",space:"Political Strategy",level:2,salary:"₹12–25 LPA",desc:"Advise elected officials or parties on policy positioning, campaign strategy, and governance delivery. Intersection of policy expertise and political acumen.",skills:["Political communication","Campaign strategy","Governance advisory","Stakeholder management","Media strategy","Data-driven decision-making"],orgs:["I-PAC","Political consulting firms","Party research cells","Independent consultants"],req:"5–8 years in policy or politics. Deep understanding of Indian electoral and governance dynamics.",next:[45],verticals:["Governance"]},
{id:45,title:"Chief of Staff / Senior Political Advisor",space:"Political Strategy",level:3,salary:"₹20–50+ LPA",desc:"Advise a senior elected official or party leader on policy and governance. Coordinate between political office and bureaucracy. Rare, high-influence role.",skills:["Political judgment","Bureaucratic coordination","Crisis management","Policy synthesis","Confidential counsel"],orgs:["CMO offices","PMO","Senior MP offices","State leadership offices"],req:"10+ years. Deep political networks. Trust of the principal. Discretion and judgment.",next:[],verticals:["Governance"]},
// ADDITIONAL ROLES (5)
{id:46,title:"M&E / Impact Evaluation Specialist",space:"Dev Consulting",level:2,salary:"₹12–25 LPA",desc:"Design and implement evaluation frameworks for programmes and policies. Run RCTs, quasi-experimental designs, or theory-based evaluations. Growing demand across the ecosystem.",skills:["RCT design","Stata/R (advanced)","Survey design","Sampling","Theory of change","Evaluation reporting"],orgs:["IDinsight","J-PAL South Asia","3ie","IFMR","World Bank (evaluation)"],req:"Master's/PhD with quantitative methods. Strong statistical skills. Field research experience.",next:[],verticals:["Any"]},
{id:47,title:"Policy Communication Specialist",space:"Multilateral / IO",level:1,salary:"₹10–18 LPA",desc:"Translate complex research and programme results into accessible formats for government, media, and public audiences. Growing role across think tanks, IOs, and NGOs.",skills:["Policy writing","Data visualisation","Infographic design","Media engagement","Social media strategy","Plain language communication"],orgs:["UNDP","UNICEF","CEEW","IDR","World Bank"],req:"3–5 years in journalism, communications, or policy writing. Portfolio of published work.",next:[25],verticals:["Any"]},
{id:48,title:"Fundraising / Development Manager",space:"NGO / Civil Society",level:2,salary:"₹10–18 LPA",desc:"Drive institutional fundraising: write proposals, manage donor relationships, ensure compliance. Critical function as FCRA shrinks and domestic philanthropy grows.",skills:["Proposal writing","Donor management","CSR engagement","Compliance (FCRA, 80G)","Impact reporting","Relationship building"],orgs:["Any mid-to-large NGO","Dasra","Sattva (fundraising advisory)"],req:"5+ years. Understanding of donor landscape (bilateral, CSR, domestic philanthropy). Strong writing.",next:[33],verticals:["Any"]},
{id:49,title:"Data Analyst / Data for Policy",space:"Think Tank",level:1,salary:"₹6–14 LPA",desc:"Build datasets, clean administrative data, create visualisations, run statistical models to support policy research. Growing demand as evidence-based policymaking expands.",skills:["Python/R","SQL","Data visualisation","Statistical analysis","Survey data","Government data systems"],orgs:["CEEW","IDinsight","IndiaSpend","J-PAL","World Bank"],req:"Quantitative degree (stats, econ, CS). Strong programming skills. Interest in policy applications.",next:[46],verticals:["Any"]},
{id:50,title:"Community Manager / Chapter Lead",space:"Policy Communication",level:0,salary:"₹3–7 LPA",desc:"Build and manage local policy communities: organise meetups, curate opportunities, moderate discussions. A new role emerging as policy communities scale across India.",skills:["Community building","Event management","Social media","Content curation","Local networking","WhatsApp/Telegram management"],orgs:["PPI","IDR (local events)","Think tank outreach teams"],req:"Passion for policy. Local network. Strong communication skills. Often part-time or volunteer initially.",next:[24],verticals:["Any"]},
];

/* ═══ SKILLS (72) ═══ */
const SK=[
{cat:"Research & Analysis",c:V.teal,s:["Quantitative analysis (Stata/R/Python)","Qualitative research (FGDs, KIIs, ethnography)","Policy brief writing","Literature review","Data visualisation (Tableau, D3)","Survey design","Cost-benefit analysis","GIS / spatial analysis","Impact evaluation (RCTs, DiD)","Econometrics","Systematic reviews","Budget analysis"]},
{cat:"Communication",c:V.indigo,s:["Policy brief (1–4 pagers)","Op-ed writing","Report writing (donor/govt)","Slide storytelling","Newsletter strategy","Social media advocacy","Speechwriting","Translation (EN→HI)","Podcast scripting","Data journalism","Infographic design","Plain language"]},
{cat:"Technical",c:V.coral,s:["Python/R/Stata","Web scraping","Dashboard dev","RTI/NIC portals","DPI (Aadhaar/UPI)","AI/ML for policy","GovTech design","Cybersecurity","SQL","PM tools (Jira)","CRM tools","Advanced Excel"]},
{cat:"Interpersonal",c:V.plum,s:["Stakeholder mapping","Cross-cultural comms","Negotiation","Team management","Public speaking","Coalition building","Political sensing","Trust-building","Managing up","Crisis comms","Emotional intelligence","Bipartisan work"]},
{cat:"Domain Knowledge",c:V.amber,s:["Constitutional law","Budget processes","Legislative process","Regulatory frameworks","SDGs / Paris Agreement","Indian federalism","Govt scheme architecture","Foreign policy","Corporate governance","Financial inclusion","EIA process","Land rights"]},
{cat:"Management",c:V.olive,s:["Programme management","M&E design","Grant writing","Financial reporting","Procurement","Theory of change","Risk management","Strategic planning","HR (nonprofits)","Org development","Knowledge mgmt","Board governance"]},
];

const PATHS=[
{n:"LAMP Fellowship",d:"~40/yr with MPs. ₹23K/mo. 10–11 months.",t:"fellowship"},{n:"Mukherjee Fellowship",d:"Political strategy consulting with policymakers.",t:"fellowship"},{n:"Haryana CMGGA",d:"Since 2016. 22 districts. With Ashoka Univ.",t:"fellowship"},{n:"Maharashtra CM Fellowship",d:"7th year. IIT Bombay partnership.",t:"fellowship"},{n:"Bihar CM Fellowship",d:"2026. ₹80K–1.5L/mo. IIM Bodh Gaya cert.",t:"fellowship"},{n:"Gujarat CM Fellowship",d:"India's earliest (2009). Pioneered the model.",t:"fellowship"},{n:"SBI Youth for India",d:"13-month rural immersion. ₹20K/mo.",t:"fellowship"},{n:"Gandhi Fellowship",d:"2-year school transformation. Piramal Foundation.",t:"fellowship"},{n:"Teach For India",d:"2-year teaching + systemic reform.",t:"fellowship"},{n:"Policy Sangam (PPI)",d:"Launching Aug 2026. 75 fellows, 3 tracks.",t:"fellowship"},
{n:"JSGP",d:">80% placement, avg ₹7.5 LPA.",t:"education"},{n:"Kautilya",d:"90% placement, avg ₹15 LPA.",t:"education"},{n:"Azim Premji Univ",d:"₹2.73L. ~90% social sector.",t:"education"},{n:"Takshashila",d:"Online. 7K+ alumni. ₹42K cert.",t:"education"},{n:"ISPP",d:"150+ partner orgs. Kelkar-Shah framework.",t:"education"},{n:"TISS",d:"Social work tradition. Mumbai/Hyd/Guwahati.",t:"education"},{n:"IITs (Delhi/Bombay/Madras)",d:"Post-NEP 2020. Engineering + policy.",t:"education"},{n:"IIM Bangalore PGPPM",d:"Earliest (2002). ₹20L. High brand.",t:"education"},{n:"NLSIU MPP",d:"Law-integrated policy curriculum.",t:"education"},{n:"Ashoka YIF",d:"1-year liberal studies. Policy feeder.",t:"education"},
{n:"NITI Aayog YP",d:"₹70K/mo, 2 yrs. High access.",t:"government"},{n:"UPSC Civil Services",d:"10L+ apply, ~1K seats.",t:"government"},{n:"State PSCs",d:"State-specific. Lower competition.",t:"government"},
{n:"Dalberg/FSG/Sattva entry",d:"'Subsidised training'. Build skills, buffer.",t:"consulting"},{n:"Think tank internships",d:"CEEW/CPR/ORF. 2–6 mo. Path to FT.",t:"research"},{n:"Corporate GAPA entry",d:"Needs 2–5 yrs prior. Highest ceiling.",t:"corporate"},{n:"UN Volunteers / JPO",d:"Multilateral stepping stone.",t:"multilateral"},
];

/* ═══ QUIZ ═══ */
const QZ=[
{q:"What pulls you toward this work?",opts:[{l:"A system failed someone I know",tg:["NGO / Civil Society","Government"]},{l:"Understanding decisions at scale",tg:["Think Tank","Legal & Regulatory"]},{l:"Building something millions use",tg:["Government","Social Enterprise"]},{l:"Where power meets information",tg:["Corporate GAPA","Political Strategy"]},{l:"Shaping narratives and public understanding",tg:["Policy Communication","Academia"]},{l:"Funding and enabling others",tg:["Philanthropy / CSR","Multilateral / IO"]}]},
{q:"Your academic background?",opts:[{l:"Social Sciences / Humanities",tg:["Think Tank","NGO / Civil Society","Policy Communication"]},{l:"Law",tg:["Legal & Regulatory","Corporate GAPA"]},{l:"Economics / Finance / Commerce",tg:["Dev Consulting","Philanthropy / CSR","Multilateral / IO"]},{l:"Engineering / STEM / Data",tg:["Social Enterprise","Think Tank"]},{l:"Medicine / Public Health",tg:["Multilateral / IO","NGO / Civil Society"]},{l:"Media / Journalism",tg:["Policy Communication"]},{l:"Management / MBA",tg:["Dev Consulting","Corporate GAPA","Philanthropy / CSR"]}]},
{q:"Ideal workday texture?",opts:[{l:"Deep writing, building arguments over weeks",tg:["Think Tank","Academia","Legal & Regulatory"]},{l:"Meetings, stakeholders, navigating politics",tg:["Government","Corporate GAPA","Multilateral / IO"]},{l:"Fieldwork, communities, ground reality",tg:["NGO / Civil Society"]},{l:"Data, dashboards, building evidence",tg:["Think Tank","Dev Consulting","Social Enterprise"]},{l:"Fast context-switching: clients, deliverables",tg:["Dev Consulting","Corporate GAPA"]},{l:"Content, narratives, reaching audiences",tg:["Policy Communication"]}]},
{q:"Compensation priority?",opts:[{l:"Financial stability now",tg:["Corporate GAPA","Dev Consulting","Legal & Regulatory"]},{l:"Lower pay for meaningful work",tg:["NGO / Civil Society","Think Tank","Government"]},{l:"Catches up over time",tg:["Government","Dev Consulting","Multilateral / IO"]},{l:"Highest possible ceiling",tg:["Corporate GAPA","Social Enterprise","Legal & Regulatory"]}]},
{q:"Ambiguity tolerance?",opts:[{l:"Show me the ladder",tg:["Government","Corporate GAPA","Legal & Regulatory"]},{l:"Fine if intellectually stimulating",tg:["Think Tank","Dev Consulting","Multilateral / IO"]},{l:"I create roles that don't exist yet",tg:["Social Enterprise","Policy Communication","Political Strategy"]},{l:"Want to sample many options first",tg:["Dev Consulting","Multilateral / IO"]}]},
{q:"Where do you want to be based?",opts:[{l:"Delhi",tg:["Think Tank","Government","Multilateral / IO","Corporate GAPA"]},{l:"Mumbai / Bangalore",tg:["Dev Consulting","Social Enterprise","Corporate GAPA","Philanthropy / CSR"]},{l:"State capitals",tg:["Government","NGO / Civil Society","Political Strategy"]},{l:"Rural / smaller cities",tg:["NGO / Civil Society"]},{l:"Open to travel",tg:["Dev Consulting","Multilateral / IO"]}]},
];

const PRINCIPLES=[{n:1,t:"Invest in Human Skills",q:"One day the only jobs people will do will be jobs only people can do.",d:"Reading a room, building trust with a sceptical bureaucrat, explaining a complex finding to a minister in four minutes."},{n:2,t:"Find Your Competitive Advantage",q:"Sample ten flavours before you buy one.",d:"The profession is broad enough that everyone can find a niche where their combination is an advantage."},{n:3,t:"Show, Don't Tell",q:"Evidence of skills counts more than claims.",d:"Link to the brief you published. Share the dashboard you built. Don't just list skills."},{n:4,t:"Increase Your Luck Surface Area",q:"Make it easier for people to discover your work.",d:"Fill gaps rather than compete. Create something that doesn't exist yet."},{n:5,t:"Shun Competition, Identify Gaps",q:"If you wait for permission, you'll keep waiting.",d:"A fellowship that didn't exist in 2008 now spans 8+ states."},{n:6,t:"Shape Your Values",q:"A large chunk of hiring is a vibe check.",d:"Are you someone others want beside them when things get hard?"}];

/* ═══ COMPONENT ═══ */
export default function App(){
const[tab,setTab]=useState("roles");const[sel,setSel]=useState(null);const[spaceF,setSpaceF]=useState("All");const[levelF,setLevelF]=useState("All");const[search,setSearch]=useState("");
const[qStep,setQStep]=useState(0);const[qAns,setQAns]=useState({});const[qDone,setQDone]=useState(false);
const[pathF,setPathF]=useState("all");const[skillF,setSkillF]=useState(null);const[compare,setCompare]=useState([]);

const filtered=useMemo(()=>{let f=R;if(spaceF!=="All")f=f.filter(r=>r.space===spaceF);if(levelF!=="All")f=f.filter(r=>LEVELS[r.level]===levelF);if(search)f=f.filter(r=>r.title.toLowerCase().includes(search.toLowerCase())||r.desc.toLowerCase().includes(search.toLowerCase())||r.skills.some(s=>s.toLowerCase().includes(search.toLowerCase())));return f;},[spaceF,levelF,search]);

const qResults=useMemo(()=>{if(!qDone)return null;const sc={};SPACES_LIST.forEach(s=>sc[s]=0);Object.values(qAns).forEach(o=>o.tg.forEach(t=>{if(sc[t]!==undefined)sc[t]++;}));return Object.entries(sc).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([s,v])=>({space:s,score:v,roles:R.filter(r=>r.space===s)}));},[qDone,qAns]);

const toggleCompare=(id)=>setCompare(p=>p.includes(id)?p.filter(x=>x!==id):p.length<3?[...p,id]:p);
const compRoles=compare.map(id=>R.find(r=>r.id===id)).filter(Boolean);

const TABS=[{id:"roles",l:"Role Explorer"},{id:"quiz",l:"Career Quiz"},{id:"ladder",l:"Career Ladders"},{id:"skills",l:"Skills Map"},{id:"paths",l:"Pathways"},{id:"compass",l:"Compass"}];
const pill=(active,color=V.teal)=>({padding:"6px 15px",borderRadius:20,background:active?color:V.card,border:active?"none":`1px solid ${V.border}`,color:active?"#fff":V.mid,cursor:"pointer",fontSize:12,fontWeight:active?600:500,boxShadow:active?"none":V.shadow,transition:"all .2s"});
const card=()=>({background:V.card,border:`1px solid ${V.border}`,borderRadius:14,padding:"18px",boxShadow:V.shadow});

return(<div style={{fontFamily:"'Manrope',sans-serif",background:V.bg,color:V.text,minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::selection{background:${V.teal}22;color:${V.teal}}@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fu .4s ease-out forwards}button,input{font-family:'Manrope',sans-serif}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(26,26,46,.1);border-radius:3px}`}</style>

<header style={{borderBottom:`1px solid ${V.border}`,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#FFFEFA",position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${V.teal},${V.indigo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"#fff"}}>P</div>
<div><div style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:600,letterSpacing:"-0.02em"}}>Policy Career Navigator</div>
<div style={{fontSize:10,color:V.lt,letterSpacing:"0.06em",textTransform:"uppercase"}}>by Public Policy India</div></div></div>
<div style={{fontSize:11,color:V.lt}}>{R.length} roles · {SPACES_LIST.length} spaces · {SK.reduce((a,c)=>a+c.s.length,0)} skills</div>
</header>

<nav style={{display:"flex",borderBottom:`1px solid ${V.border}`,background:"#FFFEFB",overflowX:"auto",position:"sticky",top:64,zIndex:99}}>
{TABS.map(t=><button key={t.id} onClick={()=>{setTab(t.id);setSel(null);}} style={{flex:"1 0 auto",padding:"12px 16px",background:tab===t.id?"#EEF0E8":"transparent",border:"none",borderBottom:tab===t.id?`2.5px solid ${V.teal}`:"2.5px solid transparent",color:tab===t.id?V.teal:V.lt,cursor:"pointer",fontSize:12.5,fontWeight:tab===t.id?700:500,transition:"all .2s",whiteSpace:"nowrap"}}>{t.l}</button>)}
</nav>

<main style={{maxWidth:980,margin:"0 auto",padding:"24px 18px 80px"}}>

{/* ═══ ROLE EXPLORER ═══ */}
{tab==="roles"&&!sel&&<div className="fu">
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,marginBottom:4}}>Role Explorer</h1>
<p style={{fontSize:14,color:V.mid,marginBottom:20}}>{R.length} specific roles across {SPACES_LIST.length} spaces. Filter by career stage, space, or search by skill.</p>

<div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
<input placeholder="Search roles, skills, keywords..." value={search} onChange={e=>setSearch(e.target.value)} style={{padding:"8px 16px",borderRadius:10,background:V.card,border:`1px solid ${V.border}`,color:V.text,fontSize:13,width:260,outline:"none",boxShadow:V.shadow}}/>
<div style={{marginLeft:8,fontSize:11,color:V.lt,fontWeight:600}}>STAGE:</div>
{["All",...LEVELS].map(l=><button key={l} onClick={()=>setLevelF(l)} style={pill(levelF===l,LEVEL_C[LEVELS.indexOf(l)]||V.teal)}>{l}</button>)}
</div>
<div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
<div style={{fontSize:11,color:V.lt,fontWeight:600,padding:"6px 0"}}>SPACE:</div>
{["All",...SPACES_LIST].map(s=><button key={s} onClick={()=>setSpaceF(s)} style={pill(spaceF===s,V.indigo)}>{s}</button>)}
</div>

{compare.length>0&&<div style={{...card(),marginBottom:16,borderLeft:`3px solid ${V.coral}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
<div style={{fontSize:12,color:V.coral,fontWeight:600}}>Comparing {compare.length}/3 roles</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{compRoles.map(r=><span key={r.id} style={{fontSize:11,padding:"3px 10px",borderRadius:16,background:`${V.coral}10`,color:V.coral}}>{r.title} ×</span>)}<button onClick={()=>setSel({compare:true})} style={{padding:"5px 14px",borderRadius:8,background:V.coral,border:"none",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:600}}>Compare →</button></div>
</div>}

<div style={{fontSize:12,color:V.lt,marginBottom:10}}>{filtered.length} roles found</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
{filtered.map(r=>{const lc=LEVEL_C[r.level];return <div key={r.id} style={{...card(),cursor:"pointer",transition:"all .2s",borderTop:`3px solid ${lc}`}} onClick={()=>setSel(r)} onMouseOver={e=>e.currentTarget.style.boxShadow=V.shadowH} onMouseOut={e=>e.currentTarget.style.boxShadow=V.shadow}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
<div><div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600,lineHeight:1.2}}>{r.title}</div><div style={{fontSize:11,color:V.lt,marginTop:2}}>{r.space}</div></div>
<div style={{display:"flex",gap:4,alignItems:"center"}}><button onClick={e=>{e.stopPropagation();toggleCompare(r.id);}} style={{width:22,height:22,borderRadius:6,background:compare.includes(r.id)?`${V.coral}15`:V.warm,border:compare.includes(r.id)?`1.5px solid ${V.coral}`:`1px solid ${V.border}`,cursor:"pointer",fontSize:10,color:compare.includes(r.id)?V.coral:V.lt,display:"flex",alignItems:"center",justifyContent:"center"}}>⇔</button></div>
</div>
<p style={{fontSize:12,color:V.mid,lineHeight:1.55,marginBottom:10}}>{r.desc.substring(0,120)}...</p>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:11,padding:"3px 10px",borderRadius:16,background:`${lc}12`,color:lc,fontWeight:600}}>{LEVELS[r.level]}</span>
<span style={{fontSize:12,color:V.text,fontWeight:600}}>{r.salary}</span>
</div>
<div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:3}}>{r.skills.slice(0,4).map((s,i)=><span key={i} style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:V.warm,color:V.mid}}>{s}</span>)}{r.skills.length>4&&<span style={{fontSize:10,color:V.lt}}>+{r.skills.length-4}</span>}</div>
</div>;})}
</div></div>}

{/* ═══ ROLE DETAIL ═══ */}
{tab==="roles"&&sel&&!sel.compare&&<div className="fu">
<button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:V.teal,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16}}>← All roles</button>
<div style={{...card(),borderTop:`4px solid ${LEVEL_C[sel.level]}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
<div><span style={{fontSize:11,padding:"3px 10px",borderRadius:16,background:`${LEVEL_C[sel.level]}12`,color:LEVEL_C[sel.level],fontWeight:600}}>{LEVELS[sel.level]}</span>
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:600,marginTop:6}}>{sel.title}</h1>
<div style={{fontSize:13,color:V.lt,marginTop:2}}>{sel.space}</div></div>
<div style={{fontSize:18,fontWeight:700,color:V.teal,textAlign:"right"}}>{sel.salary}</div>
</div>
<p style={{fontSize:14,color:V.mid,lineHeight:1.75,marginBottom:20}}>{sel.desc}</p>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
<div style={{background:V.warm,borderRadius:12,padding:"16px"}}><div style={{fontSize:10,color:V.lt,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:8}}>Requirements</div><p style={{fontSize:13,color:V.mid,lineHeight:1.65}}>{sel.req}</p></div>
<div style={{background:V.warm,borderRadius:12,padding:"16px"}}><div style={{fontSize:10,color:V.lt,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:8}}>Sample Organisations</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{sel.orgs.map((o,i)=><span key={i} style={{fontSize:12,padding:"4px 10px",borderRadius:8,background:V.card,border:`1px solid ${V.border}`,color:V.mid}}>{o}</span>)}</div></div>
</div>

<div style={{marginBottom:18}}><div style={{fontSize:10,color:V.lt,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:8}}>Skills Required</div>
<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{sel.skills.map((s,i)=><span key={i} style={{fontSize:12,padding:"6px 14px",borderRadius:10,background:`${LEVEL_C[sel.level]}08`,border:`1px solid ${LEVEL_C[sel.level]}18`,color:V.text,fontWeight:450}}>{s}</span>)}</div></div>

{sel.verticals&&<div style={{marginBottom:18}}><div style={{fontSize:10,color:V.lt,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:6}}>Typical Verticals</div>
<div style={{display:"flex",gap:6}}>{sel.verticals.map((v,i)=><span key={i} style={{fontSize:11,padding:"4px 12px",borderRadius:16,background:`${V.amber}10`,color:V.amber,fontWeight:500}}>{v}</span>)}</div></div>}

{sel.next&&sel.next.length>0&&<div><div style={{fontSize:10,color:V.lt,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:8}}>Next Roles in Career Ladder</div>
<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{sel.next.map(nid=>{const nr=R.find(r=>r.id===nid);return nr?<button key={nid} onClick={()=>setSel(nr)} style={{...card(),cursor:"pointer",padding:"10px 14px",display:"flex",alignItems:"center",gap:8,transition:"all .2s",flex:"1 0 200px"}} onMouseOver={e=>e.currentTarget.style.boxShadow=V.shadowH} onMouseOut={e=>e.currentTarget.style.boxShadow=V.shadow}>
<div style={{width:8,height:8,borderRadius:4,background:LEVEL_C[nr.level]}}/>
<div><div style={{fontSize:13,fontWeight:600}}>{nr.title}</div><div style={{fontSize:11,color:V.lt}}>{nr.salary}</div></div><span style={{marginLeft:"auto",fontSize:11,color:V.teal}}>→</span>
</button>:null;})}</div></div>}
</div></div>}

{/* ═══ COMPARE ═══ */}
{tab==="roles"&&sel?.compare&&<div className="fu">
<button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:V.teal,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16}}>← Back</button>
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:600,marginBottom:16}}>Role Comparison</h1>
<div style={{display:"grid",gridTemplateColumns:`repeat(${compRoles.length},1fr)`,gap:14}}>
{compRoles.map(r=><div key={r.id} style={{...card(),borderTop:`3px solid ${LEVEL_C[r.level]}`}}>
<h3 style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,marginBottom:2}}>{r.title}</h3>
<div style={{fontSize:11,color:V.lt,marginBottom:10}}>{r.space}</div>
{[["Stage",LEVELS[r.level]],["Salary",r.salary],["Requirements",r.req]].map(([k,v])=><div key={k} style={{marginBottom:10}}><div style={{fontSize:10,color:V.lt,textTransform:"uppercase",fontWeight:700}}>{k}</div><div style={{fontSize:12,color:V.mid,lineHeight:1.5,marginTop:2}}>{v}</div></div>)}
<div style={{fontSize:10,color:V.lt,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>Skills</div>
<div style={{display:"flex",flexWrap:"wrap",gap:3}}>{r.skills.map((s,i)=><span key={i} style={{fontSize:10,padding:"2px 7px",borderRadius:8,background:V.warm,color:V.mid}}>{s}</span>)}</div>
</div>)}
</div></div>}

{/* ═══ QUIZ ═══ */}
{tab==="quiz"&&!qDone&&<div className="fu" style={{maxWidth:640,margin:"0 auto"}}>
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,textAlign:"center",marginBottom:4}}>Career Discovery Quiz</h1>
<p style={{fontSize:14,color:V.mid,textAlign:"center",marginBottom:24}}>Six questions. Maps your instincts to {SPACES_LIST.length} spaces and {R.length} specific roles.</p>
<div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:24}}>{QZ.map((_,i)=><div key={i} style={{width:i===qStep?28:12,height:4,borderRadius:2,background:i<qStep?V.teal:i===qStep?`${V.teal}80`:`${V.teal}15`,transition:"all .3s"}}/>)}</div>
<div key={qStep} className="fu" style={card()}>
<div style={{fontSize:11,color:V.teal,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Q{qStep+1}/{QZ.length}</div>
<h2 style={{fontFamily:"'Fraunces',serif",fontSize:21,fontWeight:500,marginBottom:16}}>{QZ[qStep].q}</h2>
<div style={{display:"flex",flexDirection:"column",gap:7}}>{QZ[qStep].opts.map((o,i)=><button key={i} onClick={()=>{const na={...qAns,[qStep]:o};setQAns(na);if(qStep<QZ.length-1)setTimeout(()=>setQStep(qStep+1),200);else setTimeout(()=>setQDone(true),250);}} style={{background:qAns[qStep]?.l===o.l?`${V.teal}08`:V.warm,border:qAns[qStep]?.l===o.l?`1.5px solid ${V.teal}40`:`1.5px solid ${V.border}`,borderRadius:10,padding:"12px 16px",color:V.text,cursor:"pointer",fontSize:13,textAlign:"left",transition:"all .2s"}}>{o.l}</button>)}</div>
{qStep>0&&<button onClick={()=>setQStep(qStep-1)} style={{marginTop:14,background:"none",border:"none",color:V.lt,cursor:"pointer",fontSize:12}}>← Previous</button>}
</div></div>}

{tab==="quiz"&&qDone&&qResults&&<div className="fu">
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,textAlign:"center",marginBottom:4}}>Your Policy Career Map</h1>
<p style={{fontSize:14,color:V.mid,textAlign:"center",marginBottom:24}}>Your top spaces and the specific roles within them.</p>
{qResults.map((s,i)=><div key={i} style={{...card(),marginBottom:14,borderLeft:`4px solid ${LEVEL_C[i%5]}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<h2 style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:600}}>#{i+1} {s.space}</h2>
<span style={{fontSize:12,color:V.lt}}>{s.roles.length} roles</span>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:8}}>
{s.roles.slice(0,6).map(r=><button key={r.id} onClick={()=>{setTab("roles");setSel(r);}} style={{...card(),cursor:"pointer",textAlign:"left",padding:"12px",borderTop:`2px solid ${LEVEL_C[r.level]}`}}>
<div style={{fontSize:13,fontWeight:600}}>{r.title}</div>
<div style={{fontSize:11,color:V.lt}}>{LEVELS[r.level]} · {r.salary}</div>
</button>)}
</div></div>)}
<button onClick={()=>{setQStep(0);setQAns({});setQDone(false);}} style={{padding:"10px 20px",borderRadius:10,background:V.teal,border:"none",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600}}>Retake</button>
</div>}

{/* ═══ CAREER LADDERS ═══ */}
{tab==="ladder"&&<div className="fu">
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,marginBottom:4}}>Career Ladders</h1>
<p style={{fontSize:14,color:V.mid,marginBottom:24}}>How roles connect and progress within each space. Tap any role for details.</p>
{SPACES_LIST.filter(s=>R.some(r=>r.space===s)).map(space=>{const roles=R.filter(r=>r.space===space).sort((a,b)=>a.level-b.level);if(!roles.length)return null;
return <div key={space} style={{...card(),marginBottom:16}}>
<h3 style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:600,marginBottom:14}}>{space}</h3>
<div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
{LEVELS.map((lev,li)=>{const lRoles=roles.filter(r=>r.level===li);if(!lRoles.length)return <div key={li} style={{minWidth:140,opacity:.3,textAlign:"center",padding:"12px",fontSize:11,color:V.lt}}>{lev}<br/>—</div>;
return <div key={li} style={{minWidth:160,flex:"1 0 160px"}}>
<div style={{fontSize:10,color:LEVEL_C[li],fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8,textAlign:"center"}}>{lev}</div>
{lRoles.map(r=><button key={r.id} onClick={()=>{setTab("roles");setSel(r);}} style={{width:"100%",marginBottom:6,...card(),cursor:"pointer",padding:"10px 12px",textAlign:"left",borderLeft:`3px solid ${LEVEL_C[li]}`,transition:"all .2s"}} onMouseOver={e=>e.currentTarget.style.boxShadow=V.shadowH} onMouseOut={e=>e.currentTarget.style.boxShadow=V.shadow}>
<div style={{fontSize:12,fontWeight:600}}>{r.title}</div>
<div style={{fontSize:10,color:V.lt,marginTop:2}}>{r.salary}</div>
</button>)}
</div>;})}
</div></div>;})}
</div>}

{/* ═══ SKILLS ═══ */}
{tab==="skills"&&<div className="fu">
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,marginBottom:4}}>Skills Map</h1>
<p style={{fontSize:14,color:V.mid,marginBottom:20}}>{SK.reduce((a,c)=>a+c.s.length,0)} skills across {SK.length} categories. Tap a skill to see which roles need it.</p>
<div style={{display:"flex",gap:7,marginBottom:20,flexWrap:"wrap"}}>
<button onClick={()=>setSkillF(null)} style={pill(!skillF,V.teal)}>All</button>
{SK.map(c=><button key={c.cat} onClick={()=>setSkillF(c.cat)} style={pill(skillF===c.cat,c.c)}>{c.cat}</button>)}
</div>
{SK.filter(c=>!skillF||c.cat===skillF).map(c=><div key={c.cat} style={{marginBottom:24}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
<div style={{width:14,height:14,borderRadius:4,background:c.c}}/>
<div style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:600}}>{c.cat}</div>
<span style={{fontSize:11,color:V.lt}}>{c.s.length} skills</span>
</div>
<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{c.s.map((sk,i)=>{
const matchCount=R.filter(r=>r.skills.some(rs=>rs.toLowerCase().includes(sk.toLowerCase().split(" ")[0]))).length;
return <div key={i} style={{fontSize:12,padding:"8px 14px",borderRadius:10,background:V.card,border:`1px solid ${V.border}`,color:V.mid,boxShadow:V.shadow,display:"flex",alignItems:"center",gap:6}}>
{sk}{matchCount>0&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:8,background:`${c.c}15`,color:c.c,fontWeight:600}}>{matchCount}</span>}
</div>;})}</div>
</div>)}
</div>}

{/* ═══ PATHWAYS ═══ */}
{tab==="paths"&&<div className="fu">
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,marginBottom:4}}>Entry Pathways</h1>
<p style={{fontSize:14,color:V.mid,marginBottom:20}}>{PATHS.length} pathways into the ecosystem.</p>
<div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
{["all","fellowship","education","government","consulting","research","corporate","multilateral"].map(f=><button key={f} onClick={()=>setPathF(f)} style={pill(pathF===f,V.teal)}>{f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
{PATHS.filter(p=>pathF==="all"||p.t===pathF).map((p,i)=>{const cols={fellowship:V.teal,education:V.indigo,government:V.olive,consulting:V.coral,research:V.slate,corporate:V.plum,multilateral:V.amber};
return <div key={i} style={{...card(),borderLeft:`3px solid ${cols[p.t]||V.teal}`}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:`${cols[p.t]}12`,color:cols[p.t],fontWeight:600,textTransform:"uppercase"}}>{p.t}</span>
<div style={{fontFamily:"'Fraunces',serif",fontSize:14,fontWeight:600}}>{p.n}</div></div>
<p style={{fontSize:12,color:V.mid,lineHeight:1.55,marginTop:6}}>{p.d}</p>
</div>;})}
</div></div>}

{/* ═══ COMPASS ═══ */}
{tab==="compass"&&<div className="fu">
<h1 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:600,marginBottom:20}}>Career Compass</h1>
{PRINCIPLES.map((p,i)=><div key={i} style={{...card(),marginBottom:14,borderLeft:`4px solid ${[V.teal,V.coral,V.indigo,V.plum,V.amber,V.olive][i]}`,position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:8,right:16,fontFamily:"'Fraunces',serif",fontSize:48,fontWeight:700,color:`${[V.teal,V.coral,V.indigo,V.plum,V.amber,V.olive][i]}08`}}>{p.n}</div>
<div style={{fontSize:11,color:[V.teal,V.coral,V.indigo,V.plum,V.amber,V.olive][i],fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"}}>Principle {p.n}</div>
<h3 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:600,margin:"6px 0 10px"}}>{p.t}</h3>
<blockquote style={{padding:"8px 14px",borderLeft:`3px solid ${[V.teal,V.coral,V.indigo,V.plum,V.amber,V.olive][i]}30`,background:`${[V.teal,V.coral,V.indigo,V.plum,V.amber,V.olive][i]}05`,borderRadius:"0 10px 10px 0",marginBottom:10}}>
<p style={{fontSize:14,color:V.mid,fontFamily:"'Fraunces',serif",fontStyle:"italic",lineHeight:1.6}}>"{p.q}"</p></blockquote>
<p style={{fontSize:13.5,color:V.mid,lineHeight:1.7}}>{p.d}</p>
</div>)}
</div>}

</main>
<footer style={{borderTop:`1px solid ${V.border}`,padding:"16px 24px",textAlign:"center",background:"#FFFEFA"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
<div style={{width:18,height:18,borderRadius:5,background:`linear-gradient(135deg,${V.teal},${V.indigo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"#fff"}}>P</div>
<span style={{fontSize:12,fontWeight:600,color:V.mid}}>Public Policy India</span>
<span style={{fontSize:11,color:V.lt}}>· publicpolicyindia.com</span>
</div></footer>
</div>);}
