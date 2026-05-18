import Accordion from 'react-bootstrap/Accordion';
import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(import('react-markdown'));

const BlogFaq = (props) => {
  const faqs = props?.faqData;
  return (
    <div className='blog-faq mt-4'>
      <h3 className='blog-block-title'>Frequently Asked Questions</h3>
      <Accordion defaultActiveKey={null}>
        {faqs?.map((item, index) => (
          <Accordion.Item eventKey={String(item?._id ?? index)} key={item?._id ?? index}>
            <Accordion.Header>{item.blogQuestionField}</Accordion.Header>
            <Accordion.Body>
              <ReactMarkdown>{item.blogAnswerField}</ReactMarkdown>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export default BlogFaq