import React, { useRef, useState, useEffect, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import PortfolioItem from "./PortfolioItem";
import Loader from "../../components/Loader";
import MetaData from "../../components/common/MetaData";
import FeatureCaseStudy from "./FeatureCaseStudy";
import { REACT_APP_API_URL } from "../../lib/constants";
import { CiFilter, IoArrowDownCircleOutline } from '../../components/OptimizedIcons';

const Portfolio = ({ posts, industry, technologies, featuredPosts, currentPage = 1, totalPosts = 0 }) => {
  const [loader, setLoader] = useState(false);
  const [showFilter, setShowFilters] = useState(false);

  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [filteredData, setFilteredData] = useState(Array.isArray(posts) ? posts : []);
  const [featuredData, setFeaturedData] = useState(Array.isArray(featuredPosts) ? featuredPosts : []);
  const [industryData, setIndustryData] = useState(Array.isArray(industry) ? industry : []);
  const [technologiesData, setTechnologiesData] = useState(Array.isArray(technologies) ? technologies : []);
  console.log("postslength", Array.isArray(posts) ? posts.length : 0);

  //   Sticky sidebar view
  const [scrollDirection, setScrollDirection] = useState("");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState(Array.isArray(posts) ? posts.length >= 9 : false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fallbacks for data that might have failed during SSR
  const [hasFetchedPostsFallback, setHasFetchedPostsFallback] = useState(false);
  const [hasFetchedAuxFallback, setHasFetchedAuxFallback] = useState(false);

  useEffect(() => {
    if (!hasFetchedPostsFallback && (typeFilter === "All" && selectedIndustries.length === 0 && selectedTechStacks.length === 0)) {
      const apiBase = REACT_APP_API_URL.replace(/\/$/, '');
      if (!Array.isArray(posts) || posts.length === 0) {
        setHasFetchedPostsFallback(true);
        setLoader(true);
        fetch(`${apiBase}/our-portfolios?_sort=updatedAt:DESC&_limit=9&_start=${(currentPage - 1) * 9}`)
          .then((res) => res.json())
          .then((data) => {
            const list = Array.isArray(data) ? data : (data?.data || []);
            if (list.length > 0) {
              const formattedPosts = list.map(cat => ({
                id: cat?.id,
                listingColorCode: cat?.listingColorCode || null,
                project_logo: cat?.project_logo || null,
                Banner_short_description: cat?.Banner_short_description || null,
                industry: cat?.industry || null,
                Country: cat?.Country || null,
                platform_android: cat?.platform_android || null,
                platform_ios: cat?.platform_ios || null,
                platform_web: cat?.platform_web || null,
                slug: cat?.slug || null,
                android_link: cat?.android_link || null,
                ios_link: cat?.ios_link || null,
                web_link: cat?.web_link || null,
                secondary_block_img: cat?.secondary_block_img || null,
                industry_name: cat?.industry_name || null,
                tech_stacks: cat?.tech_stacks || null
              }));
              setFilteredData(formattedPosts);
              setHasMore(formattedPosts.length >= 9);
              setPage(currentPage);

              if (totalPosts === 0) {
                fetch(`${apiBase}/our-portfolios/count`)
                  .then(res => res.json())
                  .then(countData => { })
                  .catch(console.error);
              }
            }
          })
          .catch((err) => console.error("Error fetching initial case-study data", err))
          .finally(() => setLoader(false));
      }
    }
  }, [posts, typeFilter, selectedIndustries, selectedTechStacks, currentPage, hasFetchedPostsFallback, totalPosts]);

  useEffect(() => {
    if (!hasFetchedAuxFallback) {
      setHasFetchedAuxFallback(true);
      const apiBase = REACT_APP_API_URL.replace(/\/$/, '');

      if (featuredData.length === 0) {
        fetch(`${apiBase}/our-portfolios?is_featured=true&_sort=published_at:DESC`)
          .then(res => res.json())
          .then(featured => {
            const fList = Array.isArray(featured) ? featured : (featured?.data || []);
            if (fList.length > 0) setFeaturedData(fList);
          })
          .catch(console.error);
      }

      if (industryData.length === 0) {
        fetch(`${apiBase}/induustries`)
          .then(res => res.json())
          .then(ind => {
            const arr = Array.isArray(ind) ? ind : (ind?.data || []);
            if (arr.length > 0) setIndustryData(arr.map(c => ({ id: c?.id, Title: c?.Title })));
          })
          .catch(console.error);
      }

      if (technologiesData.length === 0) {
        fetch(`${apiBase}/tech-stacks?_sort=tech_name:ASC`)
          .then(res => res.json())
          .then(tech => {
            const arr = Array.isArray(tech) ? tech : (tech?.data || []);
            if (arr.length > 0) setTechnologiesData(arr.map(c => ({ id: c?.id, tech_name: c?.tech_name })));
          })
          .catch(console.error);
      }
    }
  }, [featuredData.length, industryData.length, technologiesData.length, hasFetchedAuxFallback]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection("scroll-down");
      } else {
        setScrollDirection("scroll-up");
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const handleFilterBtnClick = () => {
    setShowFilters(!showFilter);
  };

  // useEffect(() => {
  //   let filtered = posts;

  //   // Filter by type
  //   if (typeFilter !== 'All') {
  //     filtered = filtered.filter(item => {
  //       if (typeFilter === 'Mobile') {
  //         return item.platform_ios || item.platform_android;
  //       } else if (typeFilter === 'Web') {
  //         return item.platform_web;
  //       }
  //       return true;
  //     });
  //   }

  //   // Filter by industries
  //   if (selectedIndustries.length > 0) {
  //     filtered = filtered.filter(item =>
  //       selectedIndustries.includes(item.industry_name?.ind_name)
  //     );
  //   }

  //   // Filter by tech stacks
  //   if (selectedTechStacks.length > 0) {
  //     filtered = filtered.filter(item =>
  //       item.tech_stacks.some(tech => selectedTechStacks.includes(tech.tech_name))
  //     );
  //   }

  //   setFilteredData(filtered);
  // }, [typeFilter, selectedIndustries, selectedTechStacks, posts]);

  useEffect(() => {

    const fetchFilteredData = async () => {
      setLoader(true);
      try {
        const apiBase = REACT_APP_API_URL.replace(/\/$/, '');
        let query = `${apiBase}/our-portfolios?_sort=updatedAt:DESC&_limit=9&_start=0`;

        // Append query params based on filters
        if (typeFilter === "Web") {
          query += `&platform_web=true`;
        } else if (typeFilter === "Mobile") {
          query += `&_where[_or][0][platform_ios]=true&_where[_or][1][platform_android]=true`;
        }

        if (selectedIndustries.length > 0) {
          selectedIndustries.forEach((industry, index) => {
            query += `&industry_name.ind_name_in[${index}]=${encodeURIComponent(industry)}`;
          });
        }

        if (selectedTechStacks.length > 0) {
          selectedTechStacks.forEach((tech, index) => {
            query += `&tech_stacks.tech_name_in[${index}]=${encodeURIComponent(tech)}`;
          });
        }

        const res = await fetch(query);
        const data = await res.json();
        setFilteredData(data);
        setPage(1); // Reset page count after new filter
        setHasMore(data.length >= 9); // Reset hasMore flag
      } catch (err) {
        console.error("Error fetching filtered data", err);
      } finally {
        setLoader(false);
      }
    };

    if (typeFilter === "Web" || typeFilter === "Mobile" || selectedIndustries.length > 0 || selectedTechStacks.length > 0) {
      fetchFilteredData();
    }

  }, [typeFilter, selectedIndustries, selectedTechStacks]);



  const handleTechStackChange = (tech) => {
    setSelectedTechStacks(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleIndustryChange = (industry) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedTechStacks([]);
    setTypeFilter('All');
  };

  const loadMorePosts = useCallback(async () => {
    setLoadingMore(true);
    try {
      const apiBase = REACT_APP_API_URL.replace(/\/$/, '');
      let query = `${apiBase}/our-portfolios?_sort=updatedAt:DESC&_limit=9&_start=${page * 9}`;

      if (typeFilter === "Web") {
        query += `&platform_web=true`;
      } else if (typeFilter === "Mobile") {
        query += `&_where[_or][0][platform_ios]=true&_where[_or][1][platform_android]=true`;
      }

      if (selectedIndustries.length > 0) {
        selectedIndustries.forEach((industry, index) => {
          query += `&industry_name.ind_name_in[${index}]=${encodeURIComponent(industry)}`;
        });
      }

      if (selectedTechStacks.length > 0) {
        selectedTechStacks.forEach((tech, index) => {
          query += `&tech_stacks.tech_name_in[${index}]=${encodeURIComponent(tech)}`;
        });
      }

      const res = await fetch(query);
      const newPosts = await res.json();

      if (newPosts.length < 9) {
        setHasMore(false);
      }

      const combinedPosts = [...filteredData, ...newPosts];
      setFilteredData(combinedPosts);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Error loading more posts", err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, typeFilter, selectedIndustries, selectedTechStacks, filteredData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.offsetHeight &&
        !loadingMore &&
        hasMore
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore, loadMorePosts]);





  return (
    <>
      <MetaData
        title={currentPage > 1
          ? `App Development Portfolio - Appzoro | Page ${currentPage}`
          : "App Development Portfolio - Appzoro"}
        description={currentPage > 1
          ? `Check out our app development portfolio showcasing innovative projects across various industries, highlighting our expertise and creativity. Page ${currentPage}`
          : "Check out our app development portfolio showcasing innovative projects across various industries, highlighting our expertise and creativity."}
        url={`/case-study`}
        image={`${process.env.REACT_APP_API_URL}/assets/images/az-logo-large.png`}
      />
      <MainHeader />
      {loader && <Loader />}
      <section className="works_title">
        <Container>
          <div className="work-page-title">
            <h1>
              <span>Transform</span> The World With Your Idea.
            </h1>
            <p>
              From dream to reality, here are some apps we are proud to be part
              of.
            </p>
          </div>
        </Container>
      </section>
      <section className="works-feature-projects">
        <Container>
          <h3>Featured Projects</h3>
          <FeatureCaseStudy data={featuredData} />
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col xs="12" md="3">
              <div className={`scroll-container ${scrollDirection}`}>
                <div
                  className={`portfolio-filters ${showFilter ? "filter-show" : ""
                    }`}
                >
                  <div className="filter-btn">
                    <button onClick={handleFilterBtnClick}>
                      <span className="filter-text">
                        <CiFilter /> Filter
                      </span>
                      <span className="filter-arow">
                        <IoArrowDownCircleOutline />
                      </span>
                    </button>
                  </div>
                  <div className={`filter-block-view`}>
                    <div className="filter-block">
                      <h3>Filter By Type</h3>
                      <ul>
                        <li>
                          <label className="filter-checkbox">
                            <input
                              type="radio"
                              id="all"
                              value="All"
                              checked={typeFilter === 'All'}
                              onChange={() => setTypeFilter('All')}
                            />
                            <span>All</span>
                          </label>
                        </li>
                        <li>
                          <label className="filter-checkbox">
                            <input
                              type="radio"
                              id="web"
                              value="Web"
                              checked={typeFilter === 'Web'}
                              onChange={() => setTypeFilter('Web')}
                            />
                            <span>Web</span>
                          </label>
                        </li>
                        <li>
                          <label className="filter-checkbox">
                            <input
                              type="radio"
                              id="mobile"
                              value="Mobile"
                              checked={typeFilter === 'Mobile'}
                              onChange={() => setTypeFilter('Mobile')}
                            />
                            <span>Mobility</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className="filter-block">
                      <h3>Filter By Industry</h3>
                      <ul>
                        {Array.isArray(industryData) && industryData.map((item) => (
                          <li key={item?.id}>
                            <label className="filter-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedIndustries.includes(item?.Title)}
                                onChange={() => handleIndustryChange(item?.Title)}
                              />
                              <span>{item?.Title}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="filter-block mb-1">
                      <h3>Filter By Technology</h3>
                      <ul>
                        {Array.isArray(technologiesData) && technologiesData.map((item) => (
                          <li key={item?.id}>
                            <label className="filter-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedTechStacks.includes(item?.tech_name)}
                                onChange={() => handleTechStackChange(item?.tech_name)}
                              />
                              <span>{item?.tech_name}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="clear-option">
                      <button onClick={clearFilters}>Clear Filters</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12" md="9">
              {filteredData?.length > 0 ? (
                <div className="cs-works-main">
                  {Array.isArray(filteredData) && filteredData.map((item) => (
                    <PortfolioItem key={item.id} data={item} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="alert alert-danger">
                    No record found with given search criteria!
                  </div>
                </>
              )}
            </Col>
          </Row>
          {loadingMore && (
            <div className="text-center mt-4">
              <Loader />
            </div>
          )}
          {page * 9 < totalPosts && (
            <a
              href={`/case-study?page=${page + 1}`}
              style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
            >
              Next Page
            </a>
          )}

        </Container>
      </section>
      <Footer />
    </>
  );
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://admin.appzoro.com').replace(/\/$/, '');

export async function getServerSideProps(context) {
  const pageObj = parseInt(context.query?.page || '1', 10);

  if (pageObj === 1 && context.query?.page) {
    return {
      redirect: { destination: '/case-study', permanent: true },
    };
  }

  try {
    const limit = 9;
    const start = (pageObj - 1) * limit;

    const [postsRes, industryRes, technologiesRes, featuredRes] = await Promise.all([
      fetch(`${API_BASE}/our-portfolios?_sort=updatedAt:DESC&_limit=${limit}&_start=${start}`),
      fetch(`${API_BASE}/induustries`),
      fetch(`${API_BASE}/tech-stacks?_sort=tech_name:ASC`),
      fetch(`${API_BASE}/our-portfolios?is_featured=true&_sort=published_at:DESC`),
    ]);

    const [postsData, industryData, technologiesData, featuredData] = await Promise.all([
      postsRes.ok ? postsRes.json().catch(() => []) : [],
      industryRes.ok ? industryRes.json().catch(() => []) : [],
      technologiesRes.ok ? technologiesRes.json().catch(() => []) : [],
      featuredRes.ok ? featuredRes.json().catch(() => []) : [],
    ]);

    const postsList = Array.isArray(postsData) ? postsData : (postsData?.data || []);
    const industryList = Array.isArray(industryData) ? industryData : (industryData?.data || []);
    const techList = Array.isArray(technologiesData) ? technologiesData : (technologiesData?.data || []);
    const featuredList = Array.isArray(featuredData) ? featuredData : (featuredData?.data || []);

    const posts = postsList.map(cat => ({
      id: cat?.id,
      listingColorCode: cat?.listingColorCode || null,
      project_logo: cat?.project_logo || null,
      Banner_short_description: cat?.Banner_short_description || null,
      industry: cat?.industry || null,
      Country: cat?.Country || null,
      platform_android: cat?.platform_android || null,
      platform_ios: cat?.platform_ios || null,
      platform_web: cat?.platform_web || null,
      slug: cat?.slug || null,
      android_link: cat?.android_link || null,
      ios_link: cat?.ios_link || null,
      web_link: cat?.web_link || null,
      secondary_block_img: cat?.secondary_block_img || null,
      industry_name: cat?.industry_name || null,
      tech_stacks: cat?.tech_stacks || null
    }));

    const industry = industryList.map(cat => ({
      id: cat?.id,
      Title: cat?.Title
    }));

    const technologies = techList.map(cat => ({
      id: cat?.id,
      tech_name: cat?.tech_name
    }));

    // Fetch total count to know absolute max depth for SEO pagination
    let totalCaseStudies = posts.length;
    try {
      const countRes = await fetch(`${API_BASE}/our-portfolios/count`);
      totalCaseStudies = countRes.ok ? await countRes.json() : posts.length;
    } catch (e) {
      console.error("Error fetching count", e);
    }

    return {
      props: { posts, industry, technologies, featuredPosts: featuredList, currentPage: pageObj, totalPosts: totalCaseStudies }
    };
  } catch (error) {
    console.error("Error in getServerSideProps for case-study:", error);
    return {
      props: { posts: [], industry: [], technologies: [], featuredPosts: [], currentPage: 1, totalPosts: 0 }
    }
  }
}

export default Portfolio;
