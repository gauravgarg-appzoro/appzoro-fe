import Image from "next/image";
import Link from "next/link";
import React from "react";
import { STRAPI_IMAGE_BASE_URL } from "../../lib/constants";
import { Col, Row } from "react-bootstrap";
import { LuMoveRight } from '../../components/OptimizedIcons';

const PortfolioItem = (props) => {
  const data = props.data;
  return (
    <div
      className="cs-works-item"
      style={{ backgroundColor: `${data?.listingColorCode}` }}
      key={data?.id}
    >
      <div className="cs-works-item_left">
        {data?.project_logo && (
          <Image
            src={`${STRAPI_IMAGE_BASE_URL}${data?.project_logo?.url || ''}`}
            alt="portfolio"
            width={160}
            height={52}
            sizes="(max-width: 768px) 50vw, 160px"
          />
        )}
        <p>{data?.Banner_short_description}</p>
        <Row>
          {data?.industry && (
            <Col xs="4" md="4">
              <div className="cs-word-tags">
                <span>Industry</span>
                <p>{data?.industry?.Title}</p>
              </div>
            </Col>
          )}
          {data?.Country && (
            <Col xs="4" md="4">
              <div className="cs-word-tags">
                <span>Country</span>
                <p>{data?.Country}</p>
              </div>
            </Col>
          )}
          {data?.platform_android ||
            data?.platform_ios ||
            data?.platform_web && (
              <Col xs="4" md="4">
                <div className="cs-word-tags">
                  <span>Platforms</span>
                  <p>
                    {data?.platform_android && <span>Android</span>}
                    {data?.platform_ios && <span>ios</span>}
                    {data?.platform_web && <span>Web</span>}
                  </p>
                </div>
              </Col>
            )}
        </Row>
        <Link href={`/case-study/${data?.slug}`} className="btn-style-border">
          View Case Study{" "}
          <span>
            <LuMoveRight />
          </span>
        </Link>
        <div className="cs-works-icons">
          {data?.android_link && (
            <Link href={data?.android_link} target="_blank">
              <Image
                src="/assets/images/playstore.png"
                alt="Android"
                width="30"
                height="30"

              />
            </Link>
          )}
          {data?.ios_link && (
            <Link href={data?.ios_link} target="_blank">
              <Image
                src="/assets/images/applestore.png"
                alt="ios"
                width="30"
                height="30"

              />
            </Link>
          )}
          {data?.web_link && (
            <Link href={data?.web_link} target="_blank">
              <Image
                src="/assets/images/web.png"
                alt="ios"
                width="30"
                height="30"

              />
            </Link>
          )}
        </div>
      </div>

      <div className="cs-works-item_right">
        {data?.secondary_block_img && (
          <Image
            src={`${STRAPI_IMAGE_BASE_URL}${data?.secondary_block_img?.url || ''}`}
            alt="project"
            width={196}
            height={222}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioItem;
