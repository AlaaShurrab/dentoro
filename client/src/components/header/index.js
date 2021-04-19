import React from 'react';
import { Typography } from 'antd';

import theme from '../../assets/images/theme1.png';
import Image from '../common/Image';
import Services from './data';
import './style.css';

const { Title, Text } = Typography;

const Header = () => (
  <div className="Service-display" id="home">
    <div className="container">
      <div className="image-container">
        <Image src={theme} alt="dental cover pic" className="img" />
      </div>

      <div className="content">
        <Title level={4} className="header-subtitle">
          Innovative Technology
        </Title>
        <Title className="header-title">Certified dentist</Title>
        <Text className="description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
          necessitatibus quidem nesciunt dolor
        </Text>
        <a className="read-more-button" type="button" href="#about-us">
          Read More
        </a>
      </div>
    </div>
    <div className="Service-container">{Services}</div>
  </div>
);
export default Header;
