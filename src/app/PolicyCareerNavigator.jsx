"use client";
import { useState, useMemo, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM
   ════════════════════════════════════════════════════════════════════════════ */
const C = {
  bg: "#F6F4EE", card: "#FFFFFF", warm: "#EFEBE3", cream: "#FAF8F4",
  text: "#181830", mid: "#44445A", lt: "#7E7E92", faint: "#ADADB8",
  teal: "#0F7B63", navy: "#263159", coral: "#CF4F38", plum: "#6E3F6E",
  amber: "#B07D18", olive: "#517A2E", slate: "#3E6068", rose: "#B04060",
  border: "#E3E0D6", borderLt: "#EDEBE4",
  sh: "0 1px 3px rgba(24,24,48,.04), 0 4px 14px rgba(24,24,48,.03)",
  shH: "0 2px 6px rgba(24,24,48,.06), 0 10px 28px rgba(24,24,48,.05)",
};
const LEVELS = ["Entry", "Early-Career", "Mid-Career", "Senior", "Leadership"];
const LC = [C.teal, C.navy, C.coral, C.plum, C.amber];
const SPACE_NAMES = ["Think Tank","Government","Dev Consulting","NGO / Civil Society","Corporate GAPA","Policy Communication","Multilateral / IO","Philanthropy / CSR","Legal & Regulatory","Social Enterprise","Academia","Political Strategy"];
const SPACE_COLORS = {"Think Tank":C.teal,"Government":C.navy,"Dev Consulting":C.coral,"NGO / Civil Society":C.olive,"Corporate GAPA":C.plum,"Policy Communication":C.amber,"Multilateral / IO":C.slate,"Philanthropy / CSR":C.rose,"Legal & Regulatory":C.navy,"Social Enterprise":C.coral,"Academia":C.teal,"Political Strategy":C.slate};

/* ════════════════════════════════════════════════════════════════════════════
   55 ROLE PROFILES — each with id, title, space, level (0-4), salary,
   description, skills[], orgs[], req (requirements), next[] (linked role ids),
   verticals[]
   ════════════════════════════════════════════════════════════════════════════ */
const ROLES = [
  // ── THINK TANK ──
  {id:1,title:"Research Intern",space:"Think Tank",level:0,salary:"₹5–15K/mo stipend",desc:"Support senior researchers with literature reviews, data collection, and citation management at institutions like CEEW, CPR, ORF, or Vidhi. First exposure to how the policy research cycle works, from hypothesis to policy brief. Typically a 2–6 month engagement, often unpaid or with a small stipend.",skills:["Literature review","Data entry & cleaning","Citation management","Basic Excel","Academic writing","Library/database navigation"],orgs:["CEEW","CPR","ORF","Vidhi Centre for Legal Policy","NIPFP","ICRIER","Brookings India"],req:"Undergraduate or Master's student. A strong writing sample is typically required. Demonstrated interest in a specific policy vertical. Most positions are competitive despite low pay.",next:[2,3],verticals:["Any"]},
  {id:2,title:"Research Analyst / Associate",space:"Think Tank",level:0,salary:"₹4–8 LPA",desc:"Conduct primary and secondary research under guidance of a Fellow or Senior Researcher. Clean datasets, run quantitative analysis in Stata or R, draft sections of working papers and policy briefs. This is the first full-time policy role for many graduates. At CEEW, the hiring process includes a written test, research presentation, and multiple interview rounds.",skills:["Stata / R / Python basics","Policy brief drafting","Data cleaning & analysis","Qualitative coding","Presentation skills","Secondary research","Note-taking at consultations"],orgs:["CEEW","ICRIER","Brookings India","Carnegie India","CSEP","NCAER","TERI","Gateway House","NIPFP"],req:"Master's degree preferred. 0–2 years experience. Writing sample + quantitative assessment typical in hiring. Deep interest in at least one policy vertical.",next:[3,4,49],verticals:["Climate","Digital","Health","Finance","Governance"]},
  {id:3,title:"Programme Associate / Coordinator",space:"Think Tank",level:1,salary:"₹7–12 LPA",desc:"Manage specific research programmes end-to-end: coordinate with funders, organise stakeholder consultations and roundtables, manage timelines and deliverables, contribute to research outputs. A hybrid research-plus-management role that teaches you how think tanks actually operate, from fundraising to impact.",skills:["Project management","Grant reporting","Stakeholder engagement","Event management & logistics","Budget tracking","Report writing","Donor communication"],orgs:["ORF","TERI","IIHS","Takshashila","Gateway House","CUTS International","RIS"],req:"2–4 years experience. Demonstrated ability to manage multiple workstreams. Strong organisational and communication skills.",next:[4,5],verticals:["Any"]},
  {id:4,title:"Fellow / Senior Researcher",space:"Think Tank",level:2,salary:"₹12–20 LPA",desc:"Lead research projects independently. Author working papers and policy briefs. Present at government consultations and parliamentary committee meetings. Engage with media (op-eds, TV panels). At this level, you are beginning to build a public profile and citation record in your vertical. You may supervise 2–4 junior researchers.",skills:["Independent research design","Academic publishing","Media engagement (op-eds, panels)","Policy recommendations","Advanced quantitative analysis","Stakeholder consultation","Team supervision","Fundraising support"],orgs:["CPR","CEEW","ICRIER","Vidhi","MP-IDSA","NIPFP","CSEP","Carnegie India"],req:"5–10 years experience. Published work in reputed outlets. Master's or PhD preferred. Deep vertical expertise in at least one sector.",next:[5,6],verticals:["Climate","Governance","Digital","Trade","Health","Finance"]},
  {id:5,title:"Senior Fellow / Programme Director",space:"Think Tank",level:3,salary:"₹20–40 LPA",desc:"Shape the research agenda of an entire programme or centre within the institution. Manage teams of 5–15 researchers. Represent the institution in high-level government consultations, international conferences, and national media. At this level, you are a recognised voice in your domain, cited by policymakers and journalists.",skills:["Research leadership","Team management (5–15 people)","Fundraising & donor management","Institutional strategy","Public intellectual presence","Cross-sector convening","Board presentations"],orgs:["CPR","CEEW","ORF","ICRIER","CSEP","IIHS"],req:"10–15+ years. Strong publication record. Extensive network across government, multilateral, and academic circles. Track record of securing multi-year research grants.",next:[6],verticals:["Any"]},
  {id:6,title:"CEO / President / Director-General",space:"Think Tank",level:4,salary:"₹40–80+ LPA",desc:"Lead the entire institution. Set strategic direction, manage Board of Governors relations, fundraise at scale (often ₹20–50+ crore annual budgets), represent the institution nationally and internationally. This is a rare role, typically held for 5–15 years. Requires a national reputation and deep institutional trust.",skills:["Institutional leadership","Board governance","Strategic fundraising","National & international representation","Organisational development","Crisis management"],orgs:["CEEW","CPR","ORF","ICRIER","TERI"],req:"15+ years. National reputation. Extensive institutional and donor network. Typically recruited through Board networks rather than open hiring.",next:[],verticals:["Any"]},

  // ── GOVERNMENT ──
  {id:7,title:"LAMP / Parliamentary Research Fellow",space:"Government",level:0,salary:"₹23K/mo (LAMP)",desc:"Work directly with a Member of Parliament for 10–11 months at PRS Legislative Research. Draft parliamentary questions, prepare speeches for zero-hour debates, research legislative issues. LAMP began in 2010 with 12 fellows; now places ~40 per year from over 10,000 applicants. The Mukherjee Fellowship offers a similar experience with a political strategy angle.",skills:["Legislative research","Parliamentary procedure","Brief writing for MPs","Political communication","Rapid synthesis of complex issues","Drafting parliamentary questions"],orgs:["PRS Legislative Research (LAMP)","PPGF (Mukherjee Fellowship)"],req:"Graduate degree. Under 26 typically. Rigorous multi-stage selection (written test, interviews, group discussion). 10,000+ applicants for ~40 LAMP spots.",next:[8,9,10,24],verticals:["Governance","Any"]},
  {id:8,title:"CM Fellow / Good Governance Associate",space:"Government",level:0,salary:"₹30K–1.5L/mo (varies by state)",desc:"Posted to district administration in partnership with a state government. Work on scheme implementation, data-driven governance, and field-level problem-solving. The model started in Gujarat (2009), expanded to Haryana CMGGA (2016, with Ashoka University), Maharashtra, Bihar (2026, with IIM Bodh Gaya), Chhattisgarh, and now spans 8+ states. Bihar's newest programme pays up to ₹1.5 lakh/month for experienced professionals.",skills:["District governance understanding","Data analysis for decision-making","Field research & community engagement","Government scheme knowledge","Presentation to senior bureaucrats","Stakeholder coordination across departments"],orgs:["Haryana CMGGA","Maharashtra CM Fellowship","Bihar CM Fellowship (IIM Bodh Gaya)","Gujarat CM Fellowship","Chhattisgarh CM Fellowship"],req:"Graduate/postgraduate. Age limits vary by state. Some require state domicile (Bihar). 1–3 year commitment. Selection includes case studies and interviews.",next:[9,10,17],verticals:["Governance","Education","Health","Rural"]},
  {id:9,title:"Young Professional (NITI Aayog)",space:"Government",level:1,salary:"₹8.4 LPA (₹70K/mo)",desc:"Two-year contract at India's apex policy think tank within government. Support verticals like health, education, SDGs, women and child development, or infrastructure. Extraordinary access: you attend Secretary-level meetings, PM-chaired Governing Council sessions, and inter-ministerial consultations. The structural weakness is knowledge loss when your contract expires.",skills:["Policy analysis","Government file noting systems","Data presentation for senior bureaucrats","Inter-ministerial coordination","Note drafting","Government data systems (PFMS, NIC portals)"],orgs:["NITI Aayog"],req:"Under 30 typically. Master's preferred in relevant domain. Domain expertise in a specific vertical. Highly competitive (thousands of applicants).",next:[10,14,24],verticals:["Any"]},
  {id:10,title:"Consultant / Specialist (Govt Contract)",space:"Government",level:2,salary:"₹12–25 LPA",desc:"Contractual domain expert in central ministries, NITI Aayog, or state governments. Often funded through World Bank, UNDP, or bilateral agency project loans. You bring specific technical expertise (health systems, digital governance, urban planning) that the permanent bureaucracy lacks. Contracts range from 11 months to 3 years.",skills:["Deep domain expertise","Policy drafting","Government processes & file systems","Stakeholder management across political boundaries","Report writing (government style)","Data analysis"],orgs:["Any central ministry","State government departments","DARPG","MoHFW","MeitY","Min of Education","World Bank-funded projects"],req:"5–10 years domain experience. Often requires very specific technical skills. Contractual (no permanent tenure).",next:[11],verticals:["Any"]},
  {id:11,title:"IAS / Senior Civil Servant",space:"Government",level:3,salary:"₹15–30 LPA + benefits",desc:"Career civil servant through UPSC. Progression from Sub-Divisional Magistrate to District Magistrate to Commissioner to Secretary. Extraordinary power and scale: a DM oversees the execution of virtually every central and state scheme within their jurisdiction for India's 741 districts. Transfers and political dynamics are constant realities.",skills:["Administrative leadership","Political navigation","Crisis management","File & noting system mastery","Public administration","Hindi/regional language fluency","Protocol management"],orgs:["All central and state government positions"],req:"UPSC Civil Services Examination (10 lakh+ registrations for ~1,000 positions). 2–4 years preparation typical. One of the most competitive examinations globally.",next:[],verticals:["Any"]},

  // ── DEV CONSULTING ──
  {id:12,title:"Analyst / Research Analyst",space:"Dev Consulting",level:0,salary:"₹5–10 LPA",desc:"Entry-level at firms like Sattva, Samagra, or smaller consultancies. Conduct secondary research, build Excel models, draft slides, support senior consultants on client engagements. You learn the consulting rhythm: scoping, research, analysis, synthesis, presentation. Case interviews are typical during hiring.",skills:["Secondary research","Excel modelling","Slide design (PowerPoint/Google Slides)","MECE / structured thinking","Client email communication","Data compilation"],orgs:["Sattva","Samagra","Samhita","Think Through Consulting","Access Livelihoods","Athena Infonomics"],req:"Bachelor's or Master's. Analytical aptitude. Case interview typical in hiring. Interest in social sector.",next:[13,14],verticals:["Any"]},
  {id:13,title:"Associate / Senior Associate",space:"Dev Consulting",level:1,salary:"₹10–22 LPA",desc:"Own workstreams within client engagements. Lead primary research: design surveys, facilitate FGDs with beneficiaries, conduct KIIs with block-level officials. Present findings to mid-level government clients. Beginning to develop sector expertise and client relationships. At Dalberg (750+ people, 30 offices globally), Associates typically have MPP/MBA backgrounds.",skills:["Primary research design (surveys, FGDs, KIIs)","FGD / KII facilitation","Data analysis & synthesis","Client management","Proposal writing (RFPs)","Sector-specific domain expertise","Team coordination"],orgs:["Dalberg Advisors","FSG","IDinsight","Sattva","IPE Global","BCG Social Impact","Bridgespan","EY-Parthenon"],req:"2–5 years experience. MPP/MBA from recognised programme OR strong prior consulting/research background. Published work valued.",next:[14,15],verticals:["Any"]},
  {id:14,title:"Manager / Engagement Manager",space:"Dev Consulting",level:2,salary:"₹18–35 LPA",desc:"Manage entire client engagements end-to-end. Lead teams of 3–6 consultants. Shape project methodology, ensure quality, present to senior government clients (Principal Secretaries, Foundation heads). You are developing a sector reputation and beginning to bring in new business.",skills:["Engagement management","Team leadership (3–6 people)","Quality assurance","Senior client relations","Business development / proposals","Methodology design","Budget management"],orgs:["Dalberg","FSG","Deloitte Government & Public Services","McKinsey Social Sector Practice","PwC India Government Advisory","KPMG Development Advisory"],req:"5–10 years. Track record of high-quality deliverables. Depth in at least one sector. Client relationship skills.",next:[15],verticals:["Any"]},
  {id:15,title:"Principal / Partner / Director",space:"Dev Consulting",level:4,salary:"₹40–80+ LPA",desc:"Drive business development, shape firm strategy, lead thought leadership publications. Manage a portfolio of senior client relationships across government, philanthropy, and multilateral institutions. P&L responsibility for a practice area or geography.",skills:["Business development & sales","Thought leadership","Sector eminence","P&L management","Institutional relationship management","Strategic advisory at C-suite level"],orgs:["Dalberg","FSG","Bridgespan","Deloitte GPS","McKinsey Social Sector"],req:"12+ years. Deep sector relationships across government and development ecosystem. Revenue generation track record.",next:[],verticals:["Any"]},

  // ── NGO / CIVIL SOCIETY ──
  {id:16,title:"Field Coordinator / Community Organiser",space:"NGO / Civil Society",level:0,salary:"₹2.5–5 LPA",desc:"Work directly in villages, blocks, or urban slums. Mobilise communities for meetings, collect household-level data, facilitate SHG (Self-Help Group) formation, support programme delivery. This is the most ground-level role in the entire policy ecosystem. Local language fluency is non-negotiable.",skills:["Community mobilisation & facilitation","Local language fluency (essential)","Household data collection","SHG formation & support","RTI awareness","Government scheme knowledge (MGNREGA, PDS, PM-KISAN)","Conflict resolution"],orgs:["PRADAN","Jan Sahas","Gram Vaani","SEWA","Action Aid India","Childline India","iPartner India"],req:"Bachelor's degree. Local language essential. Willingness to live in rural or peri-urban areas for extended periods. Comfort with field travel.",next:[17,18],verticals:["Rural","Gender","Governance","Health","Education","Water"]},
  {id:17,title:"Programme Manager",space:"NGO / Civil Society",level:1,salary:"₹6–12 LPA",desc:"Manage a programme across 5–20 blocks or districts. Supervise field teams of 10–30 people. Track outcomes against log-frame indicators. Manage budgets (₹20 lakh to ₹2 crore). Report to donors (quarterly narrative + financial reports). You are the bridge between ground reality and institutional expectations.",skills:["Programme design & management","Team supervision (10–30 people)","M&E and MIS","Budget management","Donor reporting (narrative + financial)","Field supervision & travel","Training of trainers (ToT)"],orgs:["Pratham","Akshara Foundation","WaterAid India","Room to Read India","Teach For India","Azim Premji Foundation","The/Nudge Institute"],req:"3–6 years field experience. Master's in social work, development studies, or public policy often valued but not required if field experience is strong.",next:[18,19,48],verticals:["Education","Health","Rural","Water","Gender"]},
  {id:18,title:"State / Regional Director",space:"NGO / Civil Society",level:2,salary:"₹12–20 LPA",desc:"Oversee all programmes in a state or region. Manage 20–100+ staff across multiple districts. Handle state government relationships (Principal Secretary, Director-level). Lead fundraising for the geography. Strategic and operational leadership combined.",skills:["Strategic leadership","State government relations","Large team management (20–100+)","Fundraising & donor engagement","Advocacy & coalition building","Context-specific governance expertise","Crisis management"],orgs:["Pratham","Oxfam India","CRY","HelpAge India","The/Nudge","Catalyst Group / Swasti"],req:"8–12 years including substantial field experience. Deep state-level networks. Track record of programme scale-up.",next:[19],verticals:["Any"]},
  {id:19,title:"CEO / Executive Director",space:"NGO / Civil Society",level:4,salary:"₹20–45+ LPA",desc:"Lead the entire organisation. Board relations, strategic direction, national fundraising (often ₹10–100+ crore annual budgets), partnerships, public representation. Often founder-led in the Indian context. The FCRA crackdown (20,700+ NGOs struck off since 2020) has made this role significantly more complex.",skills:["Organisational leadership","Board governance & management","National fundraising strategy","Public communication & media","Sector thought leadership","FCRA/regulatory compliance","Institutional partnership building"],orgs:["Pratham","SEWA","Dasra","Ashoka India","Akshara Foundation"],req:"15+ years. National reputation in at least one sector. Deep institutional relationships across government, philanthropy, and civil society.",next:[],verticals:["Any"]},

  // ── CORPORATE GAPA ──
  {id:20,title:"Policy Analyst (Corporate)",space:"Corporate GAPA",level:0,salary:"₹8–16 LPA",desc:"Track legislative and regulatory developments across central and state governments. Draft monitoring reports and regulatory trackers. Support position paper development. At tech companies, this means tracking the DPDP Rules, Telecom Act amendments, intermediary guidelines, e-commerce rules, and more, across both central and state jurisdictions.",skills:["Regulatory tracking & monitoring","Legislative analysis","Report writing","Stakeholder mapping","Research on regulatory developments","Government gazette monitoring"],orgs:["Google India","Meta India","Amazon India","Uber India","Flipkart","PhonePe","Paytm","Mastercard India"],req:"Law degree (LLB/LLM) or MPP/MA. 0–2 years experience. Understanding of Indian legislative and regulatory landscape.",next:[21],verticals:["Digital","Finance","Trade","Health"]},
  {id:21,title:"Policy Manager / Government Affairs Manager",space:"Corporate GAPA",level:2,salary:"₹22–40 LPA",desc:"Own a policy portfolio: data protection, content regulation, competition law, or sector-specific regulation. Draft position papers, engage with Joint Secretary-level government officials and industry bodies (NASSCOM, CII, FICCI). Coordinate with global policy teams in Washington, Brussels, or Singapore on cross-border regulatory issues. Google restructured its India policy function in February 2025 with a new VP-level India role.",skills:["Position paper writing","Direct government engagement","Industry body coordination (NASSCOM, CII, FICCI)","Cross-functional leadership","Regulatory analysis","Public communications & media","Global policy team coordination"],orgs:["Google India","Meta India","Amazon India","Microsoft India","Apple India","Netflix India","Mastercard India","Visa India","Uber India"],req:"5–8 years in policy, law, or government. Deep understanding of Indian regulatory landscape in your vertical. Relationship network across relevant ministries.",next:[22],verticals:["Digital","Finance","Trade","Health"]},
  {id:22,title:"Director, Public Policy / Govt Affairs",space:"Corporate GAPA",level:3,salary:"₹45–75 LPA",desc:"Lead a portfolio of policy issues for India. Manage a team of policy managers and analysts. Direct engagement with Additional Secretary and Secretary-level officials. Represent the company at high-level industry convenings, parliamentary roundtables, and media engagements. You are the company's face to Indian government.",skills:["Senior government relations","Strategic communications","Team leadership","Crisis management & rapid response","Regulatory strategy","Media engagement","C-suite briefings"],orgs:["Google India","Meta India","Amazon India","Reliance Industries","Tata Group","Airtel"],req:"10–15 years. Extensive government and industry network. Track record of navigating complex regulatory battles. Political economy intuition.",next:[23],verticals:["Digital","Finance","Trade"]},
  {id:23,title:"VP / Head of Public Policy (India/APAC)",space:"Corporate GAPA",level:4,salary:"₹80 LPA – ₹1.5 Cr+",desc:"The most senior policy role in India for a major corporation. Shape the company's entire government engagement strategy. Direct access to India CEO and global C-suite. Represent the company at the highest levels, including ministerial meetings and PM-level engagements. Nitin Saluja's career (EY → World Bank → Rajya Sabha TV → YouTube → Flipkart → Amazon → Hindustan Unilever) illustrates the revolving door dynamics at this level.",skills:["Executive leadership","Geopolitical intelligence","Board-level communication","Regulatory foresight","Institutional reputation management","Media & crisis management at scale"],orgs:["Google","Meta","Amazon","Microsoft","Reliance","Tata Group"],req:"15+ years. Deep institutional relationships across government, industry, and media. Political economy intuition at the highest level.",next:[],verticals:["Digital","Trade"]},

  // ── POLICY COMMUNICATION ──
  {id:24,title:"Content Associate / Editorial Associate",space:"Policy Communication",level:0,salary:"₹4–8 LPA",desc:"Write, edit, and curate policy content for newsletters, social media, and websites. Manage submission pipelines and editorial calendars. At PPI, this means producing The Policy Post newsletter for 22,000+ subscribers and curating 100+ job/fellowship opportunities weekly. At IDR (founded 2017, 2,000+ articles published), it means commissioning and editing analytical pieces from sector practitioners.",skills:["Editing & proofreading","Social media management (LinkedIn, Instagram)","Newsletter tools (Substack, Mailchimp)","SEO basics","Content curation","CMS management (WordPress)","Basic data visualisation"],orgs:["India Development Review (IDR)","Public Policy India (PPI)","IndiaSpend","Down To Earth","Mongabay India","Youth Ki Awaaz"],req:"Strong writing portfolio. Understanding of policy landscape. Editorial sensibility. Comfort with digital tools.",next:[25,26],verticals:["Any"]},
  {id:25,title:"Editor / Senior Editor",space:"Policy Communication",level:2,salary:"₹12–20 LPA",desc:"Commission articles from expert contributors, manage editorial calendar, develop thematic series, shape the publication's intellectual identity and editorial standards. At IDR, Senior Editors manage relationships with 100+ contributors across the development sector. This role requires both editorial judgment and deep sector knowledge.",skills:["Commissioning & developmental editing","Editorial strategy & calendar management","Expert network building","Quality control & fact-checking","Long-form editing","Data visualisation direction","Audience growth strategy"],orgs:["IDR","IndiaSpend","EPW","Article 14","Scroll.in","The Wire","Seminar magazine"],req:"5–8 years in journalism, editorial, or policy writing. Strong network of expert contributors. Track record of published editorial work.",next:[26],verticals:["Any"]},
  {id:26,title:"Head of Content / Editor-in-Chief",space:"Policy Communication",level:3,salary:"₹20–35 LPA",desc:"Set editorial direction for an entire platform. Manage a team of editors and writers. Represent the publication at conferences and in media. Drive audience growth, engagement strategy, and revenue model (subscriptions, partnerships, grants). This role defines what kind of policy platform the organisation becomes.",skills:["Editorial leadership & vision","Audience & revenue strategy","Public speaking & representation","Partnership development","Brand building","Team management","Revenue model design (grants, subscriptions, sponsored content)"],orgs:["IDR","The Wire","Scroll","IndiaSpend","PPI"],req:"10+ years. Established editorial reputation. Vision for the intersection of policy, media, and technology.",next:[],verticals:["Any"]},

  // ── MULTILATERAL ──
  {id:27,title:"Consultant (UN / World Bank)",space:"Multilateral / IO",level:1,salary:"₹8–22 LPA (contract)",desc:"Short-term contracts (3–11 months) providing technical support on specific projects. This is the most common 'foot in the door' for multilateral careers. No benefits, no job security, but excellent exposure to how international development actually works. Many professionals cycle through 3–5 consultancy contracts before converting to staff.",skills:["Technical writing (UN/donor style)","Data analysis","Programme support","Log frame development","Concept note drafting","M&E basics"],orgs:["UNDP India","UNICEF India","World Bank","WHO India","FAO India","ILO India","UN Women"],req:"Master's degree (MPP, MPH, MPA, Economics, Development Studies). 2–5 years domain experience. Ability to deliver high-quality work under tight deadlines and with minimal supervision.",next:[28,29,47],verticals:["Health","Education","Climate","Gender","Governance"]},
  {id:28,title:"National Professional Officer (NO-B/C)",space:"Multilateral / IO",level:2,salary:"₹18–35 LPA",desc:"Full staff position within a UN agency's India country office. Manage programme components, coordinate with government counterparts (typically Joint Secretary level), lead technical assistance activities. National Officers are country-specific staff (you stay in India), distinct from International Professionals who rotate globally.",skills:["Programme management","Government coordination","M&E frameworks","Stakeholder engagement","Report writing (results-based management)","Technical domain expertise","Budget management"],orgs:["UNDP India","UNICEF India","WHO India","ILO India","UN Women India","UNFPA India"],req:"5–10 years. Deep domain expertise. Understanding of Indian government systems. Often recruited from the consultant pool after demonstrating quality over multiple contracts.",next:[29,30],verticals:["Health","Education","Climate","Gender","Governance"]},
  {id:29,title:"International Professional (P-3/P-4)",space:"Multilateral / IO",level:3,salary:"₹35–60 LPA",desc:"International staff grade. Can be posted anywhere globally. Lead programme design, manage large teams (10–20+), represent the agency in high-level government dialogues. P-4 is typically the grade where you have significant programmatic authority. Competitive: hundreds of applicants per position.",skills:["Strategic programme leadership","Diplomatic engagement","Cross-country coordination","Resource mobilisation","Policy advocacy at senior government level","Team management (10–20+)","Results-based management"],orgs:["UNDP","UNICEF","WHO","World Bank","ADB","ILO"],req:"8–15 years. Usually requires international experience (postings in 2+ countries). PhD valued for technical roles. Deep technical expertise combined with managerial capacity.",next:[30],verticals:["Any"]},
  {id:30,title:"Country Representative / Director",space:"Multilateral / IO",level:4,salary:"₹55–100+ LPA",desc:"Lead an entire UN agency's operations in a country. Manage multi-million dollar programme portfolios. Interface with the highest levels of government (Minister, PM-level). Represent the UN system in national development dialogues. A rare, prestigious role requiring decades of experience.",skills:["Country-level strategic leadership","Government relations (ministerial level)","Multi-million dollar portfolio management","Diplomatic representation","Fundraising & resource mobilisation","UN system coordination"],orgs:["UNDP","UNICEF","WHO","FAO","ILO"],req:"15+ years international development experience. Typically requires postings in multiple countries across different regions. UN system experience essential.",next:[],verticals:["Any"]},

  // ── PHILANTHROPY / CSR ──
  {id:31,title:"Programme Associate (Foundation/CSR)",space:"Philanthropy / CSR",level:0,salary:"₹6–10 LPA",desc:"Support grant management: conduct due diligence on potential grantees (reviewing audited financials, programme documents, site visits), monitor funded projects against milestones, compile portfolio reports for leadership. At Dasra, Associates also help produce sector landscape studies that guide grantmaking strategy.",skills:["Due diligence & organisation assessment","Grant administration","M&E basics","Report compilation","Organisation & sector research","Excel / data management"],orgs:["Tata Trusts","EdelGive Foundation","Dasra","Rohini Nilekani Philanthropies","Michael & Susan Dell Foundation India","CIFF India"],req:"Master's degree. 1–3 years in development sector. Understanding of the NGO landscape. Analytical and writing skills.",next:[32,33],verticals:["Any"]},
  {id:32,title:"Programme Officer / CSR Manager",space:"Philanthropy / CSR",level:2,salary:"₹14–25 LPA",desc:"Manage a portfolio of grants or CSR investments (typically ₹5–50 crore across 10–25 grantees). Conduct site visits, assess impact, develop funding strategies for a thematic area. Bridge between grantees doing the ground-level work and institutional leadership making funding decisions. CSR roles at major corporates (Section 135 mandates ~₹35,000 crore annually) increasingly require this profile.",skills:["Portfolio management","Impact assessment frameworks","Grantee relationship management","Sector landscape mapping","Board presentations","Theory of change development","Site visit & due diligence"],orgs:["Tata Trusts","Azim Premji Foundation","Infosys Foundation","Piramal Foundation","Godrej Group CSR","Wipro Foundation","Reliance Foundation"],req:"5–8 years. Deep sector knowledge in at least one thematic area. Ability to assess organisational capacity and programme quality.",next:[33],verticals:["Education","Health","Rural","Climate","Gender"]},
  {id:33,title:"Director / Head of Programmes",space:"Philanthropy / CSR",level:3,salary:"₹28–55+ LPA",desc:"Shape the entire grantmaking or CSR strategy. Manage a team of programme officers. Present to Board of Trustees. Lead landscape studies that determine where hundreds of crores get deployed. At foundations like Rohini Nilekani Philanthropies or Azim Premji Foundation, this role shapes entire sectors.",skills:["Strategic grantmaking","Board governance & presentations","Team leadership","Sector thought leadership","Blended finance & catalytic capital","Systems-level thinking","Institutional partnerships"],orgs:["Tata Trusts","Azim Premji Foundation","Reliance Foundation","Rohini Nilekani Philanthropies","CIFF India","Omidyar Network India"],req:"12+ years. National reputation in at least one sector. Deep networks across the development ecosystem. Track record of effective grantmaking.",next:[],verticals:["Any"]},

  // ── LEGAL & REGULATORY ──
  {id:34,title:"Legal Research Associate / Analyst",space:"Legal & Regulatory",level:0,salary:"₹4–9 LPA",desc:"Research case law (Indian and comparative), draft legal briefs, support senior lawyers on PILs or regulatory filings. At Vidhi Centre for Legal Policy, Associates conduct the deep legal analysis that feeds into legislative recommendations. At Internet Freedom Foundation, the work focuses on digital rights litigation and policy analysis.",skills:["Legal research (Indian & comparative)","Case brief drafting","Citation management","Regulatory tracking","Legal writing","Constitutional law basics"],orgs:["Vidhi Centre for Legal Policy","CLPR","HRLN","Internet Freedom Foundation","SFLC.in","Alternative Law Forum","PRS Legislative Research"],req:"LLB from a recognised law school. Internship experience at courts or policy organisations. Interest in public interest law rather than corporate practice.",next:[35,36],verticals:["Digital","Governance","Gender","Climate","Health"]},
  {id:35,title:"Associate (Law Firm Policy Practice)",space:"Legal & Regulatory",level:1,salary:"₹10–20 LPA",desc:"Work in a top-tier law firm's regulatory or public policy practice. Advise corporate clients on compliance (DPDP Act, competition law, environmental clearances), draft regulatory submissions to TRAI/CCI/SEBI, track legislative developments. The intersection of commercial legal practice and public policy.",skills:["Regulatory analysis & compliance advisory","Client communication","Legal drafting (submissions, opinions)","Sector-specific regulation (telecom, fintech, environment)","Stakeholder mapping","Commercial awareness"],orgs:["AZB & Partners","Trilegal","Cyril Amarchand Mangaldas","Khaitan & Co","Shardul Amarchand","S&R Associates"],req:"LLB/LLM from top law school. 2–5 years. Specialisation in data protection, competition law, telecom regulation, or environmental law.",next:[36,21],verticals:["Digital","Finance","Climate"]},
  {id:36,title:"Senior Researcher / Programme Lead",space:"Legal & Regulatory",level:2,salary:"₹14–24 LPA",desc:"Lead a research programme at a legal policy organisation. Author reports that directly influence legislative drafting and regulatory design. Engage with parliamentary committees and regulatory bodies (TRAI, CCI, DPA). At Vidhi, Programme Leads have contributed to the drafting of multiple central legislations.",skills:["Legislative analysis & drafting","Report authorship","Regulatory body engagement","Parliamentary committee interaction","Team management","Public communication & media","Stakeholder consultation design"],orgs:["Vidhi","CLPR","Internet Freedom Foundation","Daksh India","PRS Legislative Research","National Law University research centres"],req:"5–10 years. Published legal/policy analysis in reputed outlets. Network across regulatory bodies, judiciary, and legislative committees.",next:[37],verticals:["Governance","Digital","Climate","Health"]},
  {id:37,title:"Director / Head of Practice",space:"Legal & Regulatory",level:3,salary:"₹25–50 LPA",desc:"Lead an entire practice area at a legal policy organisation or the public policy practice of a major law firm. Shape advocacy strategy for the institution. Represent it in Supreme Court proceedings, parliamentary consultations, and national media. At this level, you are shaping the legal architecture of Indian policymaking.",skills:["Practice leadership","Strategic litigation design","Advocacy strategy","Institutional partnerships","Public interest law expertise","Media engagement","Government relations"],orgs:["Vidhi","CLPR","HRLN","Major law firms' policy practices"],req:"10+ years. Deep expertise in a specific legal-policy intersection. National reputation. Track record of influencing legislation or jurisprudence.",next:[],verticals:["Governance","Digital"]},

  // ── SOCIAL ENTERPRISE ──
  {id:38,title:"Analyst / Associate (Impact Fund)",space:"Social Enterprise",level:0,salary:"₹8–15 LPA",desc:"Source deals, conduct due diligence on social enterprises, build financial models, prepare investment committee memos. Entry into impact investing from the finance side. At Aavishkaar (one of India's oldest impact investors), Analysts evaluate enterprises across agriculture, financial inclusion, and essential services.",skills:["Financial modelling","Due diligence & analysis","Market research","Impact measurement (IRIS+ metrics)","Investment memo writing","Sector analysis","Excel / financial tools"],orgs:["Aavishkaar Capital","Omidyar Network India","Acumen India","Unitus Capital","Indian Impact Investors Council","Caspian Debt"],req:"MBA/CFA or strong finance background. Understanding of development sector. Genuine interest in impact investing (not just finance).",next:[39,40],verticals:["Finance","Education","Health","Climate","Rural"]},
  {id:39,title:"Product / Programme Manager (GovTech)",space:"Social Enterprise",level:1,salary:"₹10–22 LPA",desc:"Build and manage technology products for governance: digital public goods, monitoring dashboards, citizen service platforms. At eGov Foundation, PMs work on platforms used by municipal corporations across India. At Haqdarshak, the focus is on connecting citizens with government welfare schemes through technology. A hybrid tech-plus-policy role.",skills:["Product management","User research (in low-resource settings)","Agile methodology","Government procurement navigation","Design thinking","Data systems & dashboards","Stakeholder management (government clients)"],orgs:["eGov Foundation","EkStep Foundation","Dimagi","Haqdarshak","Samagra (technology practice)","OpenCity","Avanti Fellows"],req:"Engineering or design background + genuine policy/governance interest. 2–5 years in product or tech. Understanding of government context essential.",next:[40],verticals:["Digital","Governance","Health","Education"]},
  {id:40,title:"VP / Director (Scaled Social Enterprise)",space:"Social Enterprise",level:3,salary:"₹25–50 LPA",desc:"Lead a major programme area or business unit at a scaled social enterprise. Manage large teams, drive strategy, interface with government clients and impact investors. At Central Square Foundation (education), this means influencing state education policy at scale. At TechnoServe (livelihoods), it means managing programmes reaching millions.",skills:["Strategic leadership","Government client management","Fundraising & investor relations","Scale-up strategy","Team building & management","Impact reporting at scale"],orgs:["Central Square Foundation","EkStep","TechnoServe India","Frontier Markets","Avanti Fellows"],req:"10+ years. Track record of scaling programmes or products. Combination of sector expertise and management capability.",next:[],verticals:["Education","Health","Digital","Rural"]},

  // ── ACADEMIA ──
  {id:41,title:"Teaching / Research Fellow",space:"Academia",level:1,salary:"₹6–14 LPA",desc:"Teach policy courses and conduct research at one of India's 16–18 dedicated public policy programmes. Shape the next generation of policy professionals. Post-NEP 2020, IITs have entered (IIT Delhi, Bombay, Madras), joining established programmes at JSGP, Azim Premji University, TISS, and Kautilya.",skills:["Curriculum design","Classroom teaching","Research methodology","Publication in peer-reviewed journals","Student mentoring","Seminar facilitation"],orgs:["JSGP (Jindal)","Azim Premji University","Ashoka University","TISS","IIT Delhi School of Public Policy","NLSIU","Kautilya School","IIM Bangalore"],req:"PhD or ABD (All But Dissertation). Strong publication record. Teaching experience valued. Domain expertise in a specific policy vertical.",next:[42],verticals:["Any"]},
  {id:42,title:"Associate / Full Professor",space:"Academia",level:3,salary:"₹18–40 LPA",desc:"Tenured or tenure-track faculty at a policy school. Shape curriculum and programme design, supervise PhD students, contribute to national policy discourse through publications and government consultations. Senior faculty at CPR, Ashoka, or JNU often serve on government committees and advisory boards.",skills:["Advanced research & publication","PhD supervision","Institutional governance","Grant acquisition (ICSSR, international)","Public intellectual presence","Curriculum leadership","Policy advisory to government"],orgs:["JNU","JSGP","Ashoka University","IIM Bangalore","TISS","Azim Premji University","NLSIU","IITs"],req:"PhD. 8+ years of research and teaching. Strong publication record in reputed journals. Track record of securing research grants.",next:[],verticals:["Any"]},

  // ── POLITICAL STRATEGY ──
  {id:43,title:"Political Research Associate",space:"Political Strategy",level:0,salary:"₹4–8 LPA",desc:"Research electoral data, draft talking points and issue briefs, prepare constituency-level briefings for elected officials or political consultancies. A less visible but growing part of the policy ecosystem. The Mukherjee Fellowship specifically trains professionals for this intersection.",skills:["Electoral data analysis","Brief writing for politicians","Political communication","Constituency research","Media monitoring","Social media analytics"],orgs:["PPGF","I-PAC","Political consulting firms","MP / MLA offices","Party research cells"],req:"Understanding of Indian political landscape. Data and analytical skills. Strong writing. Often recruited through the Mukherjee Fellowship pipeline.",next:[44,45],verticals:["Governance"]},
  {id:44,title:"Political Strategy Consultant",space:"Political Strategy",level:2,salary:"₹12–28 LPA",desc:"Advise elected officials or parties on policy positioning, governance delivery, and campaign strategy. The intersection of policy expertise and political acumen. At I-PAC, consultants work on state-level election campaigns with data-driven approaches to voter engagement.",skills:["Political communication","Campaign strategy & management","Governance advisory","Stakeholder management","Media strategy","Data-driven decision-making","Ground-level political organising"],orgs:["I-PAC","Independent political consultancies","Party strategy teams"],req:"5–8 years in policy, governance, or political communication. Deep understanding of Indian electoral and governance dynamics.",next:[45],verticals:["Governance"]},
  {id:45,title:"Chief of Staff / Senior Political Advisor",space:"Political Strategy",level:3,salary:"₹22–55+ LPA",desc:"Advise a senior elected official or party leader on policy and governance. Coordinate between the political office and the permanent bureaucracy. Rare, high-influence role that requires deep trust, discretion, and the ability to synthesise complex policy into political actionability.",skills:["Political judgment","Bureaucratic coordination","Crisis management","Policy synthesis for political audiences","Confidential counsel","Institutional memory"],orgs:["CMO offices","PMO","Senior MP offices","State-level political leadership offices"],req:"10+ years. Deep political networks. Trust of the principal. Discretion and judgment. This role is almost never openly advertised.",next:[],verticals:["Governance"]},

  // ── CROSS-CUTTING ROLES ──
  {id:46,title:"M&E / Impact Evaluation Specialist",space:"Dev Consulting",level:2,salary:"₹14–28 LPA",desc:"Design and implement evaluation frameworks for programmes and policies. Run RCTs, quasi-experimental designs (difference-in-differences, regression discontinuity), or theory-based evaluations. Growing demand across the entire ecosystem as funders and governments demand evidence of impact.",skills:["RCT design & implementation","Stata / R (advanced)","Survey design & sampling","Theory of change & log frames","Evaluation reporting","Mixed-methods research","Impact measurement frameworks"],orgs:["IDinsight","J-PAL South Asia","3ie","IFMR / Krea University","World Bank (evaluation unit)","UNDP (evaluation)"],req:"Master's or PhD with strong quantitative methods training. Statistical programming fluency (Stata/R). Field research experience.",next:[],verticals:["Any"]},
  {id:47,title:"Policy Communication Specialist",space:"Multilateral / IO",level:1,salary:"₹10–18 LPA",desc:"Translate complex research and programme results into accessible formats for government, media, and public audiences. Produce policy briefs, infographics, short videos, and social media content. A growing role as every organisation in the ecosystem recognises the gap between producing good research and getting it read.",skills:["Policy writing (multiple formats)","Data visualisation (Canva, Tableau)","Infographic design","Media engagement & press releases","Social media strategy","Plain language communication","Video scripting"],orgs:["UNDP India","UNICEF India","CEEW","IDR","World Bank India","Niti Aayog (communications)"],req:"3–5 years in journalism, communications, or policy writing. Strong portfolio of published work across formats.",next:[25],verticals:["Any"]},
  {id:48,title:"Fundraising / Development Manager",space:"NGO / Civil Society",level:2,salary:"₹10–20 LPA",desc:"Drive institutional fundraising: write grant proposals (CSR, bilateral, foundation), manage donor relationships, ensure compliance (FCRA, 80G, 12A). This is a critical function as the FCRA crackdown (20,700+ NGOs struck off since 2020) reshapes the funding landscape and domestic philanthropy grows (Bain-Dasra 2025: ₹1.31 lakh crore in FY24).",skills:["Proposal writing","Donor relationship management","CSR engagement (Section 135)","Compliance (FCRA, 80G, 12A)","Impact reporting for funders","CRM tools","Relationship building"],orgs:["Any mid-to-large Indian NGO","Dasra","Sattva (fundraising advisory)","GuideStar India"],req:"5+ years. Understanding of donor landscape (bilateral agencies, CSR, domestic philanthropy, international foundations). Excellent writing skills.",next:[33],verticals:["Any"]},
  {id:49,title:"Data Analyst / Data for Policy",space:"Think Tank",level:1,salary:"₹7–16 LPA",desc:"Build datasets, clean administrative data (NSSO, NFHS, ASI), create visualisations, run statistical models to support policy research. Growing demand as evidence-based policymaking expands. At IndiaSpend, data analysts produce the data journalism that reaches millions.",skills:["Python / R programming","SQL & database management","Data visualisation (Tableau, D3, Power BI)","Statistical analysis","Government data systems (NSSO, NFHS, Census)","Survey data analysis","Web scraping"],orgs:["CEEW","IDinsight","IndiaSpend","J-PAL South Asia","World Bank","NITI Aayog"],req:"Quantitative degree (statistics, economics, computer science, data science). Strong programming skills. Interest in policy applications of data.",next:[46],verticals:["Any"]},
  {id:50,title:"Community Manager / City Chapter Lead",space:"Policy Communication",level:0,salary:"₹3–7 LPA",desc:"Build and manage local policy communities: organise meetups, curate opportunities, moderate discussions, connect professionals. A new role emerging as policy communities scale across India. PPI runs 34 city chapters across India's largest cities, and community management is increasingly recognised as a professional skill.",skills:["Community building","Event management & logistics","Social media management","Content curation","Local networking","WhatsApp/Telegram group management","Partnership coordination"],orgs:["Public Policy India","IDR (events)","Think tank outreach teams","University policy clubs"],req:"Passion for policy. Local network in your city. Strong communication skills. Often starts as volunteer/part-time before becoming professional.",next:[24],verticals:["Any"]},
];

/* ════════════════════════════════════════════════════════════════════════════
   SKILLS TAXONOMY (72 skills, 6 categories)
   ════════════════════════════════════════════════════════════════════════════ */
const SKILLS = [
  {cat:"Research & Analysis",c:C.teal,skills:["Quantitative analysis (Stata/R/Python)","Qualitative research (FGDs, KIIs, ethnography)","Policy brief writing","Literature review & evidence synthesis","Data visualisation (Tableau, D3, Power BI)","Survey design & sampling","Cost-benefit analysis","GIS / spatial analysis","Impact evaluation (RCTs, DiD, RDD)","Econometrics & statistical modelling","Systematic reviews & meta-analysis","Budget & expenditure analysis"]},
  {cat:"Communication & Writing",c:C.navy,skills:["Policy brief (1–4 pagers for decision-makers)","Op-ed & commentary writing","Report writing (donor/government style)","Slide deck visual storytelling","Newsletter & content strategy","Social media for policy advocacy","Speechwriting & talking points","Translation (English → Hindi/regional)","Podcast & video scripting","Data journalism","Infographic design","Plain language for public audiences"]},
  {cat:"Technical & Digital",c:C.coral,skills:["Python / R / Stata programming","Web scraping & data collection","Dashboard development","RTI portal & NIC systems navigation","DPI understanding (Aadhaar, UPI, DigiLocker)","AI/ML basics for policy applications","GovTech platform design","Cybersecurity awareness","SQL & database management","Project management tools (Jira, Asana)","CRM & community management tools","Advanced Excel (pivot tables, VBA, Power Query)"]},
  {cat:"Interpersonal & Leadership",c:C.plum,skills:["Stakeholder mapping & engagement","Cross-cultural communication","Negotiation & conflict resolution","Team management & mentoring","Public speaking & facilitation","Coalition & network building","Political economy sensing (reading a room)","Building trust with sceptical bureaucrats","Managing up (working with senior leadership)","Crisis communication","Emotional intelligence in high-stakes settings","Working across party/ideological lines"]},
  {cat:"Domain & Sector",c:C.amber,skills:["Indian constitutional & administrative law","Union & state budget processes","Legislative process (Parliament, state assemblies, committees)","Sector-specific regulatory frameworks","International frameworks (SDGs, Paris Agreement)","Indian political economy & federalism","Government scheme architecture (CSS, NMPs)","Foreign policy & multilateral institutions","Corporate governance & ESG","Financial inclusion & banking regulation","Environmental Impact Assessment (EIA) process","Land & property rights frameworks"]},
  {cat:"Management & Operations",c:C.olive,skills:["Programme / project management","M&E framework design","Grant writing & management","Budget & financial reporting","Procurement & compliance","Theory of change development","Risk management","Strategic planning & OKRs","HR management in nonprofits","Organisational development","Knowledge management & documentation","Board governance & reporting"]},
];

/* ════════════════════════════════════════════════════════════════════════════
   ENTRY PATHWAYS (27)
   ════════════════════════════════════════════════════════════════════════════ */
const PATHS = [
  {n:"LAMP Fellowship",d:"~40/yr placed with MPs. ₹23K/mo. 10–11 months. Since 2010. PRS Legislative Research.",t:"fellowship"},
  {n:"Mukherjee Fellowship",d:"Political strategy consulting with leading policymakers and administrators.",t:"fellowship"},
  {n:"Haryana CMGGA",d:"Since 2016. 22 districts. 8+ cohorts. Designed with Ashoka University.",t:"fellowship"},
  {n:"Maharashtra CM Fellowship",d:"7th year. Partnership with IIT Bombay for Public Policy certification.",t:"fellowship"},
  {n:"Bihar CM Fellowship",d:"Newest (2026). ₹80K–1.5L/mo. 2-year programme. IIM Bodh Gaya PG Certificate.",t:"fellowship"},
  {n:"Gujarat / Chhattisgarh CM Fellowships",d:"Gujarat pioneered the model in 2009. Chhattisgarh runs two variants.",t:"fellowship"},
  {n:"SBI Youth for India",d:"13-month rural immersion. ₹20K/mo + accommodation. Work with grassroots NGOs.",t:"fellowship"},
  {n:"Gandhi Fellowship (Piramal)",d:"2-year school transformation. Education policy implementation at district level.",t:"fellowship"},
  {n:"Teach For India",d:"2-year classroom teaching + systemic reform. Major pipeline into education policy.",t:"fellowship"},
  {n:"Policy Sangam Fellowship (PPI)",d:"Launching Aug 15, 2026. 75 fellows. 6-week hybrid. Three tracks.",t:"fellowship"},
  {n:"JSGP (Jindal)",d:"Est. 2011. First dedicated policy school outside IIMs. >80% placement, avg ₹7.5 LPA.",t:"education"},
  {n:"Kautilya School",d:"Est. 2020. ₹13.36L fees. 90% placement, avg ₹15 LPA, highest ₹46.5 LPA.",t:"education"},
  {n:"Azim Premji University",d:"₹2.73L total (heavily subsidised). ~90% graduates enter social sector.",t:"education"},
  {n:"Takshashila (Online)",d:"Pioneered online policy education. 7000+ alumni. 12-week cert for ₹42K.",t:"education"},
  {n:"ISPP",d:"150+ partner orgs. Market-oriented. Uses Kelkar & Shah's framework.",t:"education"},
  {n:"TISS",d:"Strong social work tradition. Mumbai, Hyderabad, Guwahati campuses.",t:"education"},
  {n:"IITs (Delhi / Bombay / Madras)",d:"Post-NEP 2020. Engineering-meets-policy lens. Still maturing.",t:"education"},
  {n:"IIM Bangalore PGPPM",d:"Earliest dedicated programme (2002). 2025 redesign. ₹20L fees.",t:"education"},
  {n:"NLSIU MPP",d:"Law integrated throughout the curriculum. Strong legal-policy intersection.",t:"education"},
  {n:"Ashoka YIF",d:"1-year postgrad diploma in Liberal Studies. Significant policy career feeder.",t:"education"},
  {n:"NITI Aayog YP",d:"₹70K/mo, 2-year contract. Extraordinary access to highest government levels.",t:"government"},
  {n:"UPSC Civil Services",d:"10L+ registrations, ~1000 seats. 2–4 year preparation. The gravitational pull.",t:"government"},
  {n:"State PSC Examinations",d:"Each state runs its own exams. Lower competition, state-specific impact.",t:"government"},
  {n:"Dev Consulting entry",d:"Dalberg, Sattva, FSG. 'Subsidised training': build skills, then move.",t:"consulting"},
  {n:"Think tank internships",d:"CEEW, CPR, ORF, Vidhi. 2–6 months. Most reliable path to FT research roles.",t:"research"},
  {n:"Corporate GAPA entry",d:"Google, Meta, Amazon. Needs 2–5 yrs prior. Highest compensation ceiling.",t:"corporate"},
  {n:"UN Volunteers / JPO",d:"Stepping stones into multilateral careers. Consultancies are foot-in-door.",t:"multilateral"},
];

/* ════════════════════════════════════════════════════════════════════════════
   QUIZ (6 questions)
   ════════════════════════════════════════════════════════════════════════════ */
const QUIZ = [
  {q:"What pulls you toward this work?",opts:[{l:"A system failed someone I know",tg:["NGO / Civil Society","Government"]},{l:"Understanding how decisions get made at scale",tg:["Think Tank","Legal & Regulatory"]},{l:"Building something that reaches millions",tg:["Government","Social Enterprise","Dev Consulting"]},{l:"Being where power meets information",tg:["Corporate GAPA","Political Strategy"]},{l:"Shaping narratives and public understanding",tg:["Policy Communication","Academia"]},{l:"Enabling and funding others doing the work",tg:["Philanthropy / CSR","Multilateral / IO"]}]},
  {q:"Your academic background?",opts:[{l:"Social Sciences / Humanities",tg:["Think Tank","NGO / Civil Society","Policy Communication"]},{l:"Law",tg:["Legal & Regulatory","Corporate GAPA"]},{l:"Economics / Finance / Commerce",tg:["Dev Consulting","Philanthropy / CSR","Multilateral / IO"]},{l:"Engineering / STEM / Data",tg:["Social Enterprise","Think Tank"]},{l:"Medicine / Public Health",tg:["Multilateral / IO","NGO / Civil Society"]},{l:"Journalism / Media",tg:["Policy Communication"]},{l:"Management / MBA",tg:["Dev Consulting","Corporate GAPA","Philanthropy / CSR"]}]},
  {q:"Your ideal workday?",opts:[{l:"Deep writing and building arguments over weeks",tg:["Think Tank","Academia","Legal & Regulatory"]},{l:"Meetings, stakeholders, navigating institutional politics",tg:["Government","Corporate GAPA","Multilateral / IO"]},{l:"Fieldwork, communities, ground reality",tg:["NGO / Civil Society"]},{l:"Data, dashboards, building evidence",tg:["Think Tank","Dev Consulting","Social Enterprise"]},{l:"Fast context-switching: clients and deliverables",tg:["Dev Consulting","Corporate GAPA"]},{l:"Content, narratives, reaching large audiences",tg:["Policy Communication"]}]},
  {q:"Compensation priority?",opts:[{l:"Financial stability right now",tg:["Corporate GAPA","Dev Consulting","Legal & Regulatory"]},{l:"Lower pay for meaningful work, for now",tg:["NGO / Civil Society","Think Tank","Government","Policy Communication"]},{l:"Compensation that catches up over time",tg:["Government","Dev Consulting","Multilateral / IO"]},{l:"Highest possible ceiling",tg:["Corporate GAPA","Social Enterprise","Legal & Regulatory"]}]},
  {q:"How do you handle ambiguity?",opts:[{l:"Show me a clear ladder",tg:["Government","Corporate GAPA","Legal & Regulatory"]},{l:"Fine if the work is stimulating",tg:["Think Tank","Dev Consulting","Multilateral / IO"]},{l:"I create roles that don't exist yet",tg:["Social Enterprise","Policy Communication","Political Strategy"]},{l:"Want to sample many options first",tg:["Dev Consulting","Multilateral / IO"]}]},
  {q:"Where do you want to be based?",opts:[{l:"Delhi (central govt, think tanks, multilaterals)",tg:["Think Tank","Government","Multilateral / IO","Corporate GAPA"]},{l:"Mumbai / Bangalore (consulting, startups)",tg:["Dev Consulting","Social Enterprise","Corporate GAPA","Philanthropy / CSR"]},{l:"State capitals",tg:["Government","NGO / Civil Society","Political Strategy"]},{l:"Smaller cities / rural India",tg:["NGO / Civil Society"]},{l:"Open to travel and relocation",tg:["Dev Consulting","Multilateral / IO"]}]},
];

const PRINCIPLES = [
  {n:1,t:"Invest in Human Skills",q:"One day the only jobs people will do will be jobs only people can do.",d:"Reading a room, building trust with a sceptical bureaucrat, explaining a complex finding to a minister in four minutes: these are the hard core of policy effectiveness. AI can draft your brief. It cannot negotiate your coalition."},
  {n:2,t:"Find Your Competitive Advantage",q:"Sample ten flavours before you buy one. You will always lose to a person who is having fun.",d:"The profession is broad enough that almost everyone can find a niche where their specific combination of skills, interests, and personality is a genuine advantage. Don't pick the most prestigious path; pick the one where your obsession becomes an asset."},
  {n:3,t:"Show, Don't Tell",q:"Well-expressed evidence of skills counts for more than claims about them.",d:"Don't write 'strong writing skills' on your CV; link to the policy brief you published. Don't claim 'data analysis'; share the dashboard you built. In this field, the portfolio is the resume."},
  {n:4,t:"Increase Your Luck Surface Area",q:"Make it easier for people to discover and engage with your work.",d:"Fill gaps rather than compete. When I searched 'public policy careers India' in 2019, I found almost nothing. PPI grew because it was creating something that did not previously exist, not outcompeting established players."},
  {n:5,t:"Shun Competition, Identify Gaps",q:"If you wait for permission, you will keep waiting.",d:"The most interesting opportunities in the policy space did not exist until someone created them. A CM Fellowship that did not exist in 2008 now spans 8+ states. A policy community that did not exist in 2020 now reaches 200,000+ people."},
  {n:6,t:"Shape Your Values",q:"A large chunk of hiring is, frankly, a vibe check.",d:"Are you someone others want to work with under pressure, in ambiguous situations, when the stakes are real? Storytelling counts. The ability to articulate what you stand for, concretely and without pretension, is itself a career skill."},
];

/* ════════════════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("roles");
  const [sel, setSel] = useState(null);
  const [spaceF, setSpaceF] = useState("All");
  const [levelF, setLevelF] = useState("All");
  const [search, setSearch] = useState("");
  const [qStep, setQStep] = useState(0);
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const [pathF, setPathF] = useState("all");
  const [skillCat, setSkillCat] = useState(null);
  const [skillSel, setSkillSel] = useState(null);
  const [compare, setCompare] = useState([]);

  const filtered = useMemo(() => {
    let f = ROLES;
    if (spaceF !== "All") f = f.filter(r => r.space === spaceF);
    if (levelF !== "All") f = f.filter(r => LEVELS[r.level] === levelF);
    if (search) {
      const q = search.toLowerCase();
      f = f.filter(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.space.toLowerCase().includes(q) || r.skills.some(s => s.toLowerCase().includes(q)));
    }
    return f;
  }, [spaceF, levelF, search]);

  const qResults = useMemo(() => {
    if (!qDone) return null;
    const sc = {};
    SPACE_NAMES.forEach(s => { sc[s] = 0; });
    Object.values(qAns).forEach(o => { if (o && o.tg) o.tg.forEach(t => { if (sc[t] !== undefined) sc[t]++; }); });
    return Object.entries(sc).sort((a, b) => b[1] - a[1]).filter(([_, v]) => v > 0).slice(0, 5).map(([s, v]) => ({ space: s, score: v, roles: ROLES.filter(r => r.space === s) }));
  }, [qDone, qAns]);

  const skillRoles = useMemo(() => {
    if (!skillSel) return [];
    const q = skillSel.toLowerCase();
    return ROLES.filter(r => r.skills.some(s => s.toLowerCase().includes(q)));
  }, [skillSel]);

  const toggleCompare = useCallback((id) => {
    setCompare(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 3 ? [...p, id] : p);
  }, []);

  const compRoles = compare.map(id => ROLES.find(r => r.id === id)).filter(Boolean);

  const goToRole = useCallback((r) => { setTab("roles"); setSel(r); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  // ─── STYLE HELPERS ─────────────────────────────────────────────────────────
  const pill = (active, color = C.teal) => ({
    padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: active ? 600 : 500,
    background: active ? color : C.card, color: active ? "#fff" : C.mid,
    border: active ? "none" : `1px solid ${C.border}`, cursor: "pointer",
    boxShadow: active ? "none" : C.sh, transition: "all .2s", whiteSpace: "nowrap",
  });
  const card = () => ({
    background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
    padding: "20px", boxShadow: C.sh, position: "relative", overflow: "hidden",
  });
  const label = () => ({
    fontSize: 10, color: C.lt, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700,
  });
  const TABS = [
    { id: "roles", l: "Role Explorer", ico: "◆" },
    { id: "quiz", l: "Career Quiz", ico: "◇" },
    { id: "ladder", l: "Career Ladders", ico: "↕" },
    { id: "skills", l: "Skills Map", ico: "✧" },
    { id: "paths", l: "Pathways", ico: "→" },
    { id: "compass", l: "Compass", ico: "✦" },
  ];

  // ─── PPI CTA COMPONENT ────────────────────────────────────────────────────
  const PPICta = () => (
    <div style={{ ...card(), background: "linear-gradient(135deg, #0F7B6308, #26315908)", borderTop: `3px solid ${C.teal}`, marginTop: 28 }}>
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600, color: C.text, marginBottom: 10 }}>Keep Exploring</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.cream, borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>📬 The Policy Post Newsletter</div>
          <p style={{ fontSize: 12, color: C.mid, lineHeight: 1.6, marginBottom: 10 }}>Every Friday: a fresh database of 100s of jobs, internships, courses, essays, videos, and podcasts in the policy and social impact space. Completely free. Read by 22,000+ professionals.</p>
          <a href="https://newsletter.publicpolicyindia.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "8px 18px", borderRadius: 10, background: C.teal, color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Subscribe Free →</a>
        </div>
        <div style={{ background: C.cream, borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>🏙️ City Chapters Across India</div>
          <p style={{ fontSize: 12, color: C.mid, lineHeight: 1.6, marginBottom: 10 }}>Policy and social impact communities in 20+ cities. In-person meetups, career exchanges, learning sessions, and networking. Join the chapter for your city today.</p>
          <a href="https://drive.google.com/file/d/1rk2FMz_3w-EVuQMMZanc5gkrcG3AU9CA/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "8px 18px", borderRadius: 10, background: C.navy, color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Join Your City →</a>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Manrope',sans-serif", background: C.bg, color: C.text, minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::selection{background:rgba(15,123,99,.15);color:#0F7B63}@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fu .4s ease-out forwards}button,input,a{font-family:'Manrope',sans-serif}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(24,24,48,.08);border-radius:3px}a{color:inherit}`}</style>

      {/* ═══ HEADER ═══ */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FEFDF9", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg,${C.teal},${C.navy})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>P</div>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>Policy Career Navigator</div>
            <div style={{ fontSize: 9.5, color: C.lt, letterSpacing: "0.06em", textTransform: "uppercase" }}>by Public Policy India</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.lt, display: "flex", gap: 12, alignItems: "center" }}>
          <span>{ROLES.length} roles</span><span>·</span><span>{SKILLS.reduce((a, c) => a + c.skills.length, 0)} skills</span><span>·</span><span>{PATHS.length} pathways</span>
        </div>
      </header>

      {/* ═══ NAV ═══ */}
      <nav style={{ display: "flex", borderBottom: `1px solid ${C.border}`, background: "#FEFCF7", overflowX: "auto", position: "sticky", top: 62, zIndex: 99 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSel(null); setSkillSel(null); }} style={{
            flex: "1 0 auto", padding: "13px 14px", background: tab === t.id ? C.warm : "transparent",
            border: "none", borderBottom: tab === t.id ? `2.5px solid ${C.teal}` : "2.5px solid transparent",
            color: tab === t.id ? C.teal : C.lt, cursor: "pointer", fontSize: 12, fontWeight: tab === t.id ? 700 : 500,
            transition: "all .2s", whiteSpace: "nowrap",
          }}>{t.ico} {t.l}</button>
        ))}
      </nav>

      {/* ═══ MAIN ═══ */}
      <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 18px 40px" }}>

        {/* ─── ROLE EXPLORER ─── */}
        {tab === "roles" && !sel && (
          <div className="fu">
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Role Explorer</h1>
            <p style={{ fontSize: 14, color: C.mid, marginBottom: 18, lineHeight: 1.6 }}>{ROLES.length} specific roles across {SPACE_NAMES.length} career spaces in India's policy, social impact, law, and governance ecosystem. Filter by career stage, space, or search by skill or keyword.</p>

            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="Search roles, skills, keywords..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "8px 16px", borderRadius: 10, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontSize: 13, width: 260, outline: "none", boxShadow: C.sh }} />
              <span style={{ ...label(), padding: "0 4px" }}>Stage:</span>
              {["All", ...LEVELS].map(l => <button key={l} onClick={() => setLevelF(l)} style={pill(levelF === l, LC[LEVELS.indexOf(l)] || C.teal)}>{l}</button>)}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
              <span style={{ ...label(), padding: "6px 4px 6px 0" }}>Space:</span>
              {["All", ...SPACE_NAMES].map(s => <button key={s} onClick={() => setSpaceF(s)} style={pill(spaceF === s, SPACE_COLORS[s] || C.navy)}>{s}</button>)}
            </div>

            {compare.length > 0 && (
              <div style={{ ...card(), marginBottom: 14, borderLeft: `4px solid ${C.coral}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.coral }}>Comparing {compare.length}/3</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  {compRoles.map(r => <span key={r.id} onClick={() => toggleCompare(r.id)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 14, background: `${C.coral}10`, color: C.coral, cursor: "pointer" }}>{r.title} ✕</span>)}
                  <button onClick={() => setSel({ compare: true })} style={{ padding: "6px 16px", borderRadius: 8, background: C.coral, border: "none", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Compare →</button>
                </div>
              </div>
            )}

            <div style={{ fontSize: 12, color: C.lt, marginBottom: 8 }}>{filtered.length} role{filtered.length !== 1 ? "s" : ""} found</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
              {filtered.map(r => {
                const sc = SPACE_COLORS[r.space] || C.teal;
                const lc = LC[r.level];
                return (
                  <div key={r.id} style={{ ...card(), cursor: "pointer", transition: "box-shadow .2s, transform .2s", borderTop: `3px solid ${sc}` }} onClick={() => setSel(r)} onMouseOver={e => { e.currentTarget.style.boxShadow = C.shH; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseOut={e => { e.currentTarget.style.boxShadow = C.sh; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontWeight: 600, lineHeight: 1.25 }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: sc, fontWeight: 500, marginTop: 2 }}>{r.space}</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); toggleCompare(r.id); }} title="Add to comparison" style={{ width: 26, height: 26, borderRadius: 7, background: compare.includes(r.id) ? `${C.coral}12` : C.warm, border: compare.includes(r.id) ? `1.5px solid ${C.coral}` : `1px solid ${C.borderLt}`, cursor: "pointer", fontSize: 11, color: compare.includes(r.id) ? C.coral : C.faint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>⇔</button>
                    </div>
                    <p style={{ fontSize: 12, color: C.mid, lineHeight: 1.55, marginBottom: 10 }}>{r.desc.substring(0, 130)}{r.desc.length > 130 ? "..." : ""}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 10.5, padding: "3px 10px", borderRadius: 14, background: `${lc}10`, color: lc, fontWeight: 600 }}>{LEVELS[r.level]}</span>
                      <span style={{ fontSize: 12.5, color: C.text, fontWeight: 600 }}>{r.salary}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {r.skills.slice(0, 4).map((s, i) => <span key={i} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: C.warm, color: C.mid }}>{s}</span>)}
                      {r.skills.length > 4 && <span style={{ fontSize: 10, color: C.faint, padding: "2px 4px" }}>+{r.skills.length - 4}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <PPICta />
          </div>
        )}

        {/* ─── ROLE DETAIL ─── */}
        {tab === "roles" && sel && !sel.compare && (
          <div className="fu">
            <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: C.teal, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>← All roles</button>
            <div style={{ ...card(), borderTop: `4px solid ${SPACE_COLORS[sel.space] || C.teal}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 10.5, padding: "3px 10px", borderRadius: 14, background: `${LC[sel.level]}10`, color: LC[sel.level], fontWeight: 600 }}>{LEVELS[sel.level]}</span>
                    <span style={{ fontSize: 11, color: SPACE_COLORS[sel.space], fontWeight: 500 }}>{sel.space}</span>
                  </div>
                  <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 600, lineHeight: 1.2 }}>{sel.title}</h1>
                </div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: C.teal }}>{sel.salary}</div>
              </div>
              <p style={{ fontSize: 14, color: C.mid, lineHeight: 1.8, marginBottom: 22 }}>{sel.desc}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div style={{ background: C.warm, borderRadius: 12, padding: "16px" }}>
                  <div style={label()}>Requirements</div>
                  <p style={{ fontSize: 13, color: C.mid, lineHeight: 1.65, marginTop: 6 }}>{sel.req}</p>
                </div>
                <div style={{ background: C.warm, borderRadius: 12, padding: "16px" }}>
                  <div style={label()}>Sample Organisations</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 6 }}>
                    {sel.orgs.map((o, i) => <span key={i} style={{ fontSize: 12, padding: "4px 11px", borderRadius: 8, background: C.card, border: `1px solid ${C.borderLt}`, color: C.mid }}>{o}</span>)}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={label()}>Skills Required</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {sel.skills.map((s, i) => <span key={i} style={{ fontSize: 12, padding: "7px 15px", borderRadius: 10, background: `${SPACE_COLORS[sel.space] || C.teal}06`, border: `1px solid ${SPACE_COLORS[sel.space] || C.teal}18`, color: C.text, fontWeight: 450 }}>{s}</span>)}
                </div>
              </div>

              {sel.verticals && sel.verticals.length > 0 && sel.verticals[0] !== "Any" && (
                <div style={{ marginBottom: 20 }}>
                  <div style={label()}>Typical Sectors</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                    {sel.verticals.map((v, i) => <span key={i} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 14, background: `${C.amber}0C`, color: C.amber, fontWeight: 500 }}>{v}</span>)}
                  </div>
                </div>
              )}

              {sel.next && sel.next.length > 0 && (
                <div>
                  <div style={label()}>Where This Role Leads</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                    {sel.next.map(nid => {
                      const nr = ROLES.find(r => r.id === nid);
                      if (!nr) return null;
                      return (
                        <button key={nid} onClick={() => { setSel(nr); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ ...card(), cursor: "pointer", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flex: "1 0 200px", transition: "box-shadow .2s", borderLeft: `3px solid ${LC[nr.level]}` }} onMouseOver={e => { e.currentTarget.style.boxShadow = C.shH; }} onMouseOut={e => { e.currentTarget.style.boxShadow = C.sh; }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{nr.title}</div>
                            <div style={{ fontSize: 11, color: C.lt }}>{LEVELS[nr.level]} · {nr.salary}</div>
                          </div>
                          <span style={{ marginLeft: "auto", fontSize: 12, color: C.teal }}>→</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <PPICta />
          </div>
        )}

        {/* ─── COMPARE ─── */}
        {tab === "roles" && sel && sel.compare && (
          <div className="fu">
            <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: C.teal, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>← Back</button>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Side-by-Side Comparison</h1>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${compRoles.length},1fr)`, gap: 14 }}>
              {compRoles.map(r => (
                <div key={r.id} style={{ ...card(), borderTop: `3px solid ${LC[r.level]}` }}>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{r.title}</h3>
                  <div style={{ fontSize: 11, color: SPACE_COLORS[r.space], fontWeight: 500, marginBottom: 12 }}>{r.space}</div>
                  {[["Stage", LEVELS[r.level]], ["Salary", r.salary]].map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 10 }}>
                      <div style={label()}>{k}</div>
                      <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                  <div style={{ marginBottom: 10 }}><div style={label()}>Requirements</div><div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5, marginTop: 2 }}>{r.req}</div></div>
                  <div><div style={label()}>Skills</div><div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>{r.skills.map((s, i) => <span key={i} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 8, background: C.warm, color: C.mid }}>{s}</span>)}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── QUIZ ─── */}
        {tab === "quiz" && !qDone && (
          <div className="fu" style={{ maxWidth: 640, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 4 }}>Career Discovery Quiz</h1>
            <p style={{ fontSize: 14, color: C.mid, textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>Six questions mapping your instincts to {SPACE_NAMES.length} spaces and {ROLES.length} specific roles in the policy ecosystem.</p>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 24 }}>
              {QUIZ.map((_, i) => <div key={i} style={{ width: i === qStep ? 32 : 12, height: 4, borderRadius: 2, background: i < qStep ? C.teal : i === qStep ? `${C.teal}90` : `${C.teal}15`, transition: "all .3s" }} />)}
            </div>
            <div key={qStep} className="fu" style={card()}>
              <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Question {qStep + 1} of {QUIZ.length}</div>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 500, marginBottom: 18, lineHeight: 1.3 }}>{QUIZ[qStep].q}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {QUIZ[qStep].opts.map((o, i) => (
                  <button key={i} onClick={() => {
                    const na = { ...qAns, [qStep]: o };
                    setQAns(na);
                    if (qStep < QUIZ.length - 1) setTimeout(() => setQStep(qStep + 1), 220);
                    else setTimeout(() => setQDone(true), 250);
                  }} style={{
                    background: qAns[qStep]?.l === o.l ? `${C.teal}08` : C.warm,
                    border: qAns[qStep]?.l === o.l ? `1.5px solid ${C.teal}40` : `1.5px solid ${C.borderLt}`,
                    borderRadius: 11, padding: "13px 18px", color: C.text, cursor: "pointer",
                    fontSize: 13.5, textAlign: "left", transition: "all .2s", lineHeight: 1.5,
                  }}>{o.l}</button>
                ))}
              </div>
              {qStep > 0 && <button onClick={() => setQStep(qStep - 1)} style={{ marginTop: 16, background: "none", border: "none", color: C.lt, cursor: "pointer", fontSize: 12.5, fontWeight: 500 }}>← Previous</button>}
            </div>
          </div>
        )}

        {tab === "quiz" && qDone && qResults && (
          <div className="fu">
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 4 }}>Your Policy Career Map</h1>
            <p style={{ fontSize: 14, color: C.mid, textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>Your top spaces and the specific roles within each. Tap any role for the full profile.</p>
            {qResults.map((s, i) => (
              <div key={i} style={{ ...card(), marginBottom: 14, borderLeft: `4px solid ${SPACE_COLORS[s.space] || LC[i % 5]}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600, color: SPACE_COLORS[s.space] }}>#{i + 1} {s.space}</h2>
                  <span style={{ fontSize: 12, color: C.lt }}>{s.roles.length} roles in this space</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
                  {s.roles.map(r => (
                    <button key={r.id} onClick={() => goToRole(r)} style={{ ...card(), cursor: "pointer", textAlign: "left", padding: "12px 14px", borderTop: `2px solid ${LC[r.level]}`, transition: "box-shadow .2s" }} onMouseOver={e => { e.currentTarget.style.boxShadow = C.shH; }} onMouseOut={e => { e.currentTarget.style.boxShadow = C.sh; }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: C.lt }}>{LEVELS[r.level]} · {r.salary}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => { setQStep(0); setQAns({}); setQDone(false); }} style={{ padding: "10px 22px", borderRadius: 10, background: C.teal, border: "none", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Retake Quiz</button>
            <PPICta />
          </div>
        )}

        {/* ─── CAREER LADDERS ─── */}
        {tab === "ladder" && (
          <div className="fu">
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Career Ladders</h1>
            <p style={{ fontSize: 14, color: C.mid, marginBottom: 24, lineHeight: 1.6 }}>How roles connect and progress within each space, from Entry to Leadership. Tap any role for the full profile.</p>
            {SPACE_NAMES.filter(s => ROLES.some(r => r.space === s)).map(space => {
              const roles = ROLES.filter(r => r.space === space).sort((a, b) => a.level - b.level);
              const sc = SPACE_COLORS[space] || C.teal;
              return (
                <div key={space} style={{ ...card(), marginBottom: 16, borderLeft: `4px solid ${sc}` }}>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600, color: sc, marginBottom: 14 }}>{space}</h3>
                  <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
                    {LEVELS.map((lev, li) => {
                      const lRoles = roles.filter(r => r.level === li);
                      if (!lRoles.length) return <div key={li} style={{ minWidth: 130, textAlign: "center", padding: "10px", fontSize: 11, color: C.faint, opacity: 0.5 }}>{lev}<br />—</div>;
                      return (
                        <div key={li} style={{ minWidth: 155, flex: "1 0 155px" }}>
                          <div style={{ fontSize: 10, color: LC[li], fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, textAlign: "center" }}>{lev}</div>
                          {lRoles.map(r => (
                            <button key={r.id} onClick={() => goToRole(r)} style={{ width: "100%", marginBottom: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, borderLeft: `3px solid ${LC[li]}`, cursor: "pointer", padding: "10px 12px", textAlign: "left", boxShadow: C.sh, transition: "box-shadow .2s" }} onMouseOver={e => { e.currentTarget.style.boxShadow = C.shH; }} onMouseOut={e => { e.currentTarget.style.boxShadow = C.sh; }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{r.title}</div>
                              <div style={{ fontSize: 10, color: C.lt, marginTop: 2 }}>{r.salary}</div>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <PPICta />
          </div>
        )}

        {/* ─── SKILLS MAP ─── */}
        {tab === "skills" && (
          <div className="fu">
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Skills Map</h1>
            <p style={{ fontSize: 14, color: C.mid, marginBottom: 20, lineHeight: 1.6 }}>{SKILLS.reduce((a, c) => a + c.skills.length, 0)} skills across {SKILLS.length} categories. Tap any skill to see which roles require it.</p>

            <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap" }}>
              <button onClick={() => { setSkillCat(null); setSkillSel(null); }} style={pill(!skillCat, C.teal)}>All Categories</button>
              {SKILLS.map(c => <button key={c.cat} onClick={() => { setSkillCat(c.cat); setSkillSel(null); }} style={pill(skillCat === c.cat, c.c)}>{c.cat}</button>)}
            </div>

            {/* Skills grid */}
            {SKILLS.filter(c => !skillCat || c.cat === skillCat).map(c => (
              <div key={c.cat} style={{ marginBottom: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: c.c }} />
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600 }}>{c.cat}</div>
                  <span style={{ fontSize: 11, color: C.lt }}>{c.skills.length} skills</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {c.skills.map((sk, i) => {
                    const isActive = skillSel === sk;
                    const matchCount = ROLES.filter(r => r.skills.some(rs => {
                      const skWords = sk.toLowerCase().split(/[\s\/\(\),]+/).filter(w => w.length > 2);
                      return skWords.some(w => rs.toLowerCase().includes(w));
                    })).length;
                    return (
                      <button key={i} onClick={() => setSkillSel(isActive ? null : sk)} style={{
                        fontSize: 12, padding: "8px 15px", borderRadius: 10,
                        background: isActive ? c.c : C.card,
                        color: isActive ? "#fff" : C.mid,
                        border: isActive ? "none" : `1px solid ${C.border}`,
                        boxShadow: isActive ? "none" : C.sh,
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                        fontWeight: isActive ? 600 : 450, transition: "all .2s",
                      }}>
                        {sk}
                        {matchCount > 0 && (
                          <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 8, background: isActive ? "rgba(255,255,255,.25)" : `${c.c}12`, color: isActive ? "#fff" : c.c, fontWeight: 600 }}>{matchCount}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Roles matching selected skill */}
            {skillSel && (
              <div style={{ ...card(), marginTop: 8, borderTop: `3px solid ${C.teal}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <div style={label()}>Roles requiring</div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 600, marginTop: 2 }}>"{skillSel}"</div>
                  </div>
                  <button onClick={() => setSkillSel(null)} style={{ background: C.warm, border: `1px solid ${C.borderLt}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: C.mid }}>Clear ✕</button>
                </div>
                {skillRoles.length === 0 ? (
                  <p style={{ fontSize: 13, color: C.lt }}>No exact matches found. Try tapping a different skill.</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 10 }}>
                    {skillRoles.map(r => (
                      <button key={r.id} onClick={() => goToRole(r)} style={{ ...card(), cursor: "pointer", textAlign: "left", padding: "12px 14px", borderLeft: `3px solid ${LC[r.level]}`, transition: "box-shadow .2s" }} onMouseOver={e => { e.currentTarget.style.boxShadow = C.shH; }} onMouseOut={e => { e.currentTarget.style.boxShadow = C.sh; }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: C.lt }}>{r.space} · {LEVELS[r.level]} · {r.salary}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <PPICta />
          </div>
        )}

        {/* ─── PATHWAYS ─── */}
        {tab === "paths" && (
          <div className="fu">
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Entry Pathways</h1>
            <p style={{ fontSize: 14, color: C.mid, marginBottom: 20, lineHeight: 1.6 }}>{PATHS.length} pathways into the policy ecosystem. India has no formal pipeline into policy work: no single credentialing system, no dominant absorption mechanism. People find the field through these channels.</p>
            <div style={{ display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
              {["all", "fellowship", "education", "government", "consulting", "research", "corporate", "multilateral"].map(f => (
                <button key={f} onClick={() => setPathF(f)} style={pill(pathF === f, C.teal)}>{f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 10 }}>
              {PATHS.filter(p => pathF === "all" || p.t === pathF).map((p, i) => {
                const cols = { fellowship: C.teal, education: C.navy, government: C.olive, consulting: C.coral, research: C.slate, corporate: C.plum, multilateral: C.amber };
                const pc = cols[p.t] || C.teal;
                return (
                  <div key={i} style={{ ...card(), borderLeft: `3px solid ${pc}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: `${pc}10`, color: pc, fontWeight: 600, textTransform: "uppercase" }}>{p.t}</span>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 600 }}>{p.n}</div>
                    </div>
                    <p style={{ fontSize: 12.5, color: C.mid, lineHeight: 1.6 }}>{p.d}</p>
                  </div>
                );
              })}
            </div>
            <PPICta />
          </div>
        )}

        {/* ─── COMPASS ─── */}
        {tab === "compass" && (
          <div className="fu">
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Career Compass</h1>
            <p style={{ fontSize: 14, color: C.mid, marginBottom: 24, lineHeight: 1.6 }}>Six principles for navigating a policy career in India, from seven years across Parliament, big tech, international governance, universities, and community building.</p>
            {PRINCIPLES.map((p, i) => {
              const pc = [C.teal, C.coral, C.navy, C.plum, C.amber, C.olive][i];
              return (
                <div key={i} style={{ ...card(), marginBottom: 16, borderLeft: `4px solid ${pc}` }}>
                  <div style={{ position: "absolute", top: 10, right: 18, fontFamily: "'Fraunces',serif", fontSize: 52, fontWeight: 700, color: `${pc}08` }}>{p.n}</div>
                  <div style={{ fontSize: 11, color: pc, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Principle {p.n}</div>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 600, margin: "6px 0 12px" }}>{p.t}</h3>
                  <blockquote style={{ padding: "10px 16px", borderLeft: `3px solid ${pc}30`, background: `${pc}05`, borderRadius: "0 10px 10px 0", marginBottom: 12 }}>
                    <p style={{ fontSize: 14, color: C.mid, fontFamily: "'Fraunces',serif", fontStyle: "italic", lineHeight: 1.6 }}>"{p.q}"</p>
                  </blockquote>
                  <p style={{ fontSize: 13.5, color: C.mid, lineHeight: 1.7 }}>{p.d}</p>
                </div>
              );
            })}
            <PPICta />
          </div>
        )}

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "20px 24px", background: "#FEFDF9" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: `linear-gradient(135deg,${C.teal},${C.navy})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>P</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.mid }}>Public Policy India</span>
          </div>
          <div style={{ fontSize: 11, color: C.lt, textAlign: "center", lineHeight: 1.6 }}>
            <a href="https://publicpolicyindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, textDecoration: "none", fontWeight: 500 }}>publicpolicyindia.com</a>
            {" · "}
            <a href="https://newsletter.publicpolicyindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, textDecoration: "none", fontWeight: 500 }}>Newsletter</a>
            {" · "}
            <a href="https://www.linkedin.com/company/public-policy-india/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, textDecoration: "none", fontWeight: 500 }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
