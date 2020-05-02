
const mongoose = require('mongoose');
const Company = require('../models/company');
 
const DB_NAME = 'ebb';
 
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const company = [
  {
    name: 'Salesforce',
    industry: 'Software Company',
    url: 'http://www.salesforce.com',
    image: '../images/salesforce.png',
    description: '<p>Salesforce is an enterprise cloud computing company that provides business software on a subscription basis. The company is best known for its on-demand Customer Relationship Management (CRM) solutions. </p><p>Salesforce was founded in 1999 by former <a href="/company/salesforce" title="Oracle" rel="nofollow">Oracle</a> executive Marc Benioff, and went public in June 2004. Salesforce has been a pioneer in developing enterprise platforms through its innovative AppExchange directory of on-demand applications, and its Force.com &#8220;Platform as a Service&#8221; (PaaS) API for extending Salesforce.</p>',
    size: 'Large',
    noOfEmployees: 3500,
  },
  {
    name: 'Deloitte',
    industry: 'Professional Services',
    url: 'http://www.deloitte.com',
    image: '../images/deloitte.png',
    description: '<p>Deloitte provides audit, consulting, financial advisory, risk management, and tax services to selected clients.</p>',
    size: 'Large',
    noOfEmployees: 312028,
  },
  {
    name: 'Unilever',
    industry: 'Consumer Goods',
    url: 'http://www.unilever.com',
    image: '../images/salesforce.png',
    description: '<p>Unilever produces and supplies fast moving consumer goods in food, and home and personal care product categories in Europe, the Americas, Asia, and Africa. It offers soups, bouillons, sauces, snacks, mayonnaise, salad dressings, olive oil, margarines, spreads, and frozen foods, as well as cooking products, such as liquid margarines under Knorr, Hellmann&#8217;s, Becel/Flora, Rama/Blue Band, Calvé, WishBone, Amora, Ragù, and Bertolli brands. The company also provides ice creams under the international Heart brand, including Cornetto, Magnum, Carte d&#8217;Or and Solero, Wall&#8217;s, Kibon, Algida, Ola, Ben &amp; Jerry&#8217;s, Breyers, Klondike, and Popsicle brands; tea-based beverages under Lipton, Brooke Bond, and PG Tips brands; weight management products under Slim-Fast brand; and nutritionally enhanced products under Annapurna and AdeS/Adez brands. In addition, it offers personal care products, including deodorants, anti-perspirants, skin care, and hair care products under Dove, Lux, Rexona, Sunsilk, Axe, Pond&#8217;s, Suave, Clear, Lifebuoy, and Vaseline brands, as well as oral care products under Signal and Close Up brands. Further, the company provides laundry products, such as tablets, powders, liquids, and soap bars under Omo, Surf, Comfort, Radiant, Skip, and Snuggle brands; and household care products, including surface cleaners and bleach under Cif, Domestos, and Sun/Sunlight brands. It also offers solutions for professional chefs and caterers. </p><p>The company sells its products through its sales force, independent brokers, agents, and distributors to chain, wholesale, co-operative, and independent grocery accounts; and food service distributors and institutions. It also distributes its products through a network of distribution centers, satellite warehouses, company-operated and public storage facilities, and depots.</p>',
    size: 'Large',
    noOfEmployees: 150000,
  }
];

Company.create(companies, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${books.length} books`);
  mongoose.connection.close();
});