import { FC } from "react";
import { Typography, Flex } from "antd";
import { usePageTitle } from "../../../app/hooks";

const { Title, Paragraph } = Typography;

const AboutPage: FC = () => {
  usePageTitle(`About`);

  return (
    <Flex align="middle" justify="center" vertical style={{maxWidth: "800px"}}>
      <Title level={1} style={{ fontSize: "4rem" }}>
        Everyone Has Something to Share
      </Title>
      <Paragraph
        style={{
          fontSize: "1.2rem",
          marginBottom: "1.4rem",
        }}
      >
        The internet is vast—overflowing with information, opinions, and
        distractions. But here, we carve out a space for something different:
        clarity, depth, and real connection. This is a place where ideas come to
        life, where stories unfold, and where knowledge flows freely. Whether
        you're an expert with years of experience or someone just beginning to
        explore your passions, your voice matters. You don't need an audience or
        an algorithm to validate you—just the courage to share. Our mission is
        simple: to foster meaningful conversations and a deeper understanding of
        the world through thoughtful expression. We believe that what we create
        and consume shapes us. In an era dominated by fleeting trends and
        surface-level engagement, we value substance over spectacle, insight
        over noise. This is a space for curiosity, reflection, and ideas that
        stand the test of time. Millions of people gather here—writers, artists,
        engineers, entrepreneurs, lifelong learners. They share their
        challenges, discoveries, and the wisdom they've gained along the way.
        They write about what drives them, what keeps them up at night, and what
        they believe the world should know. We're not powered by ads or driven
        by data exploitation. Instead, we're supported by a community that
        believes in the power of authentic storytelling. So if you're new here,
        start exploring. Find something that sparks your curiosity. Learn,
        reflect, and when you're ready—add your voice to the conversation.
      </Paragraph>
    </Flex>
  );
};

export { AboutPage };
