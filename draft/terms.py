"""Terms of Service shared by every 0x2 Devs app. Rendered by render.py into terms.html."""

UPDATED = 'November 2026'


def section(number, heading, body):
    return f'<section class="policy-section"><h2>{number}. {heading}</h2>{body}</section>'


sections = [
    ('About these terms', '''
<p>These terms apply when you use any app or online service published by 0x2 Devs. By using our apps you agree
to them. If you do not agree, please do not use our apps.</p>
<p>The terms of the store you download from also apply, including the Apple Standard Licensed Application End User
License Agreement on the App Store and the Google Play Terms of Service on Google Play. If your organisation has a
separate written agreement with us, that agreement prevails where it conflicts with these terms.</p>'''),
    ('Accounts', '''
<p>You must be 13 or over to use our apps. If you are under 18, a parent or guardian must agree to these terms
for you and is responsible for any purchases you make. Some features need an account: please keep your details
accurate and your sign-in secure. You can delete your account at any time from within the app or as described in
our <a href="../privacy.html#deletion-form-wrapper">Privacy Policy</a>.</p>'''),
    ('Subscriptions and purchases', '''
<p>Most of our apps offer paid subscriptions, and some apps or features may be sold as a one-time purchase or
paid download. What each purchase includes, its price and any free trial are shown in the app and the store
before you buy.</p>
<p>Purchases are processed by the App Store or Google Play and charged to your store account. Subscriptions renew
automatically unless you cancel in your store account settings before the current period ends (at least 24 hours
before on the App Store). A free trial becomes a paid subscription when it ends unless you cancel first. Deleting
an app or your account does not cancel a subscription. Refunds are handled by the store under its policies,
subject to your rights in section 8.</p>'''),
    ('Your content and shared spaces', '''
<p>You own the content you add to our apps. You allow us to store, process and display it only as needed to run
the app for you and for the people you share it with. Content you add to a shared space, such as a family, team
or pair, is visible to its members, and the person who owns the space controls who can join it.</p>'''),
    ('Acceptable use and fair play', '''
<p>You must not break the law; harass or impersonate others; use offensive names or content; access accounts or
data without permission; interfere with, overload or scrape our services; copy or reverse engineer our apps except
where the law allows; or get around purchases, limits or rewards.</p>
<p>In our games, ratings, results and rewards have no monetary value and cannot be exchanged for money. Do not use
solving tools, automation, multiple accounts or other unfair advantages. We may correct results or ratings and
remove entries from leaderboards where these rules are broken.</p>'''),
    ('Keystone for businesses', '''
<p>Keystone is for business use. If you use it for an organisation, you confirm you are authorised to do so, and
workspace administrators control access to the workspace and its records. Keystone does not provide legal,
financial, valuation or property advice. To the extent permitted by law, our total liability for business use of
Keystone is limited to the fees paid for it in the 12 months before the claim, and we are not liable for loss of
profit, revenue or data, or for indirect loss.</p>'''),
    ('Changes and ending access', '''
<p>We may update our apps, change or remove features, or update these terms. We will not remove a paid feature
during a period you have already paid for, and we will give reasonable notice in the app or by email before a
significant change to these terms. If you do not accept a change, you can cancel and stop using the app.</p>
<p>We may suspend or end your access if you seriously or repeatedly break these terms, put others or our services
at risk, or if the law requires it. Where reasonable, we will tell you first.</p>'''),
    ('Your consumer rights', '''
<p>Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in these
terms excludes, restricts or modifies those rights or any other right that cannot lawfully be excluded.</p>
<p>Subject to those rights, our apps are provided as they are, and we do not promise they will always be available
or free of errors. Our apps are not medical, health or professional advice; please consult a qualified
professional about your or your family’s health.</p>'''),
    ('General', '''
<p>If any part of these terms is unenforceable, the rest continues to apply. If we do not enforce a term
straight away, we can still enforce it later. We may transfer these terms to a business that takes over the app
concerned. Our <a href="../privacy.html">Privacy Policy</a> explains how we handle your information. These terms
are governed by the laws of South Australia, and the courts of South Australia have non-exclusive
jurisdiction.</p>'''),
    ('Contact', '''
<p>Questions about these terms? Email <a href="mailto:info@0x2-devs.com">info@0x2-devs.com</a> or use the
<a href="about.html#contact">contact form</a> on our website.</p>'''),
]

content = f'''<div class="policy-layout wrap"><div class="content-wrap">
<span class="section-kicker">Legal</span>
<h1 class="policy-title">Terms of Service</h1>
<p class="policy-meta">Last updated: {UPDATED} - 0x2 Devs, Adelaide, South Australia</p>
<p class="policy-intro">We are 0x2 Devs, two independent software developers based in Adelaide, South Australia.
These terms cover all applications we publish, including <strong>Matchling</strong>, <strong>Orbit</strong>,
<strong>Snapling</strong>, <strong>Hatchling</strong>, <strong>Summit</strong>, <strong>Sudokling</strong>,
<strong>Keystone</strong>, and <strong>Scrambling</strong>.</p>
{''.join(section(index + 1, heading, body) for index, (heading, body) in enumerate(sections))}
</div></div>'''
