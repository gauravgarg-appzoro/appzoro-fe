import React from 'react'
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

const TechStack = () => {
  return (
    <section className='tech-partner ads_fonts' id="technologies">
      <Container>

        <div className='section-title'>
          <h3>Technologies Stack We Use</h3>
          <p>Our bespoke software development company is composed of professional IT experts with demanding knowledge and experience in:</p>
        </div>

        <div className='tech-tabs-block'>
          <Tab.Container id="left-tabs-example" defaultActiveKey="techTab1">

            <div className='tech-tabs'>
              <Nav variant="pills" className="flex-row justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="techTab1">Mobile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="techTab2">Front-end</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="techTab3">Back-end</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="techTab4">CMS & eCommerce</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="techTab5">Database</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="techTab6">Cloud</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="techTab7">DevOps</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>


            <div className='tech-tabs_content'>
              <Tab.Content>
                <Tab.Pane eventKey="techTab1">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/swift.svg" width="93" height="49" alt="Appzoro technology - Swift" /></span>
                        <div className="tech-stack-title">Swift</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/kotlin-logo.svg" width="93" height="49" alt="Appzoro technology - Kotlin" /></span>
                        <div className="tech-stack-title">Kotlin</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/react.svg" width="93" height="49" alt="Appzoro technology - React Native" /></span>
                        <div className="tech-stack-title">React Native</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/flutter.svg" width="93" height="49" alt="Appzoro technology - Flutter" /></span>
                        <div className="tech-stack-title">Flutter</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/pwa-logo.svg" width="93" height="49" alt="Appzoro technology - PWA" /></span>
                        <div className="tech-stack-title">PWA</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="techTab2">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/html.svg" width="93" height="49" alt="Appzoro technology - HTML" /></span>
                        <div className="tech-stack-title">HTML</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/css.svg" width="93" height="49" alt="Appzoro technology - CSS" /></span>
                        <div className="tech-stack-title">CSS</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/javascript.svg" width="93" height="49" alt="Appzoro technology - JavaScript" /></span>
                        <div className="tech-stack-title">JavaScript</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/react.svg" width="93" height="49" alt="Appzoro technology - React" /></span>
                        <div className="tech-stack-title">React</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/angular.svg" width="93" height="49" alt="Appzoro technology - Angular" /></span>
                        <div className="tech-stack-title">Angular</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/vue.svg" width="93" height="49" alt="Appzoro technology - Vue" /></span>
                        <div className="tech-stack-title">Vue</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/next.svg" width="93" height="49" alt="Appzoro technology - Next" /></span>
                        <div className="tech-stack-title">Next</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/meteor.svg" width="93" height="49" alt="Appzoro technology - Meteor" /></span>
                        <div className="tech-stack-title">Meteor</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/Gatsby.svg" width="93" height="49" alt="Appzoro technology - Gatsby" /></span>
                        <div className="tech-stack-title">Gatsby</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/nuxtjs-icon.svg" width="93" height="49" alt="Appzoro technology - Nuxt" /></span>
                        <div className="tech-stack-title">Nuxt</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="techTab3">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/java.svg" width="93" height="49" alt="Appzoro technology - JAVA" /></span>
                        <div className="tech-stack-title">JAVA</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/nest.svg" width="93" height="49" alt="Appzoro technology - Nest" /></span>
                        <div className="tech-stack-title">Nest</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/net-mvc.svg" width="93" height="49" alt="Appzoro technology - .NET MVC" /></span>
                        <div className="tech-stack-title">.NET MVC</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/net-core.svg" width="93" height="49" alt="Appzoro technology - .NET Core" /></span>
                        <div className="tech-stack-title">.NET Core</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/php.svg" width="93" height="49" alt="Appzoro technology - PHP" /></span>
                        <div className="tech-stack-title">PHP</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/node.svg" width="93" height="49" alt="Appzoro technology - Node" /></span>
                        <div className="tech-stack-title">Node</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/python.svg" width="93" height="49" alt="Appzoro technology - Python" /></span>
                        <div className="tech-stack-title">Python</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="techTab4">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/wordpress.svg" width="93" height="49" alt="Appzoro technology - WordPress" /></span>
                        <div className="tech-stack-title">WordPress</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/shopify.svg" width="93" height="49" alt="Appzoro technology - Shopify" /></span>
                        <div className="tech-stack-title">Shopify</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/woo-commerce.svg" width="93" height="49" alt="Appzoro technology - Woo Commerce" /></span>
                        <div className="tech-stack-title">Woo Commerce</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/magento.svg" width="93" height="49" alt="Appzoro technology - Magento" /></span>
                        <div className="tech-stack-title">Magento</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/strapi.svg" width="93" height="49" alt="Appzoro technology - Strapi" /></span>
                        <div className="tech-stack-title">Strapi</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/quintype.svg" width="93" height="49" alt="Appzoro technology - Quintype" /></span>
                        <div className="tech-stack-title">Quintype</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/contentful.svg" width="93" height="49" alt="Appzoro technology - Contentful" /></span>
                        <div className="tech-stack-title">Contentful</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="techTab5">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/SQL-server.svg" width="93" height="49" alt="Appzoro technology - SQL Server" /></span>
                        <div className="tech-stack-title">SQL Server</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/mysql-server.svg" width="93" height="49" alt="Appzoro technology - MySQL Server" /></span>
                        <div className="tech-stack-title">MySQL Server</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/nosql.svg" width="93" height="49" alt="Appzoro technology - NoSQL" /></span>
                        <div className="tech-stack-title">NoSQL</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/postgre-sql.svg" width="93" height="49" alt="Appzoro technology - Postgre SQL" /></span>
                        <div className="tech-stack-title">Postgre SQL</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/mongodb.svg" width="93" height="49" alt="Appzoro technology - MongoDB" /></span>
                        <div className="tech-stack-title">MongoDB</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/firebase.svg" width="93" height="49" alt="Appzoro technology - Firebase" /></span>
                        <div className="tech-stack-title">Firebase</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/oracle.svg" width="93" height="49" alt="Appzoro technology - Oracle" /></span>
                        <div className="tech-stack-title">Oracle</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="techTab6">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/aws.svg" width="93" height="49" alt="Appzoro technology - AWS" /></span>
                        <div className="tech-stack-title">AWS</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/azure-devops.svg" width="93" height="49" alt="Appzoro technology - Azure" /></span>
                        <div className="tech-stack-title">Azure</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/gcp.svg" width="93" height="49" alt="Appzoro technology - GCP" /></span>
                        <div className="tech-stack-title">GCP</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="techTab7">
                  <div className='tech-content-view'>
                    <ul>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/kubernetes.svg" width="93" height="49" alt="Appzoro technology - Kubernetes" /></span>
                        <div className="tech-stack-title">Kubernetes</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/jenkins.svg" width="93" height="49" alt="Appzoro technology - Jenkins" /></span>
                        <div className="tech-stack-title">Jenkins</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/gitlab.svg" width="93" height="49" alt="Appzoro technology - GitLab" /></span>
                        <div className="tech-stack-title">GitLab</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/github.svg" width="93" height="49" alt="Appzoro technology - GitHub" /></span>
                        <div className="tech-stack-title">GitHub</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/bitbucket.svg" width="93" height="49" alt="Appzoro technology - BitBucket" /></span>
                        <div className="tech-stack-title">BitBucket</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/ansible.svg" width="93" height="49" alt="Appzoro technology - Ansible" /></span>
                        <div className="tech-stack-title">Ansible</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/terraform-icon.svg" width="93" height="49" alt="Appzoro technology - Terraform" /></span>
                        <div className="tech-stack-title">Terraform</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/puppet.svg" width="93" height="49" alt="Appzoro technology - Puppet" /></span>
                        <div className="tech-stack-title">Puppet</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/azure-devops.svg" width="93" height="49" alt="Appzoro technology - Azure DevOps" /></span>
                        <div className="tech-stack-title">Azure DevOps</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/grafana.svg" width="93" height="49" alt="Appzoro technology - Grafana" /></span>
                        <div className="tech-stack-title">Grafana</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/elastic-search.svg" width="93" height="49" alt="Appzoro technology - Elastic Search" /></span>
                        <div className="tech-stack-title">Elastic Search</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/datadog-logo.svg" width="93" height="49" alt="Appzoro technology - DataDog" /></span>
                        <div className="tech-stack-title">DataDog</div>
                      </li>
                      <li>
                        <span><Image loading="lazy" src="/assets/images/technology/splunk.svg" width="93" height="49" alt="Appzoro technology - Splunk" /></span>
                        <div className="tech-stack-title">Splunk</div>
                      </li>
                    </ul>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>

          </Tab.Container>
        </div>
      </Container>
    </section>
  )
}

export default TechStack