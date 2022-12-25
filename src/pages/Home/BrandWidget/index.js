import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Brand } from "../../../components";
import "./style.scss";
import COMMON_API from "../../../api/common";
import { useEffect, useState } from "react";

const BrandWidget = () => {
  const [brandsList, setBrandsList] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    (async function () {
      try {
        const response = await COMMON_API.getAllBrand();
        setData(response.data)
        setBrandsList(response.data?.slice(0, 8));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div id="brand_widget__home">
      <div className="brand_widget__home__wrap">
        <div className="brand_widget__header">
          <div className="title">
            <div className="title_img">
              <img
                src="https://salt.tikicdn.com/ts/upload/33/0f/67/de89fab36546a63a8f3a8b7d038bff81.png"
                alt="brand"
              />
            </div>
            <div className="title_text">Thương Hiệu Chính Hãng</div>
          </div>
          <div className="see_more">
            <Link to="/products">XEM THÊM</Link>
          </div>
        </div>
        <div className="brand_widget__cards">
          <Row gutter={[{ xl: 12, lg: 16, md: 12, sm: 12, xs: 12 }, 0]}>
            {brandsList?.map((item) => {
              return (
                <Col xl={4} lg={6} md={6} sm={8} xs={12} key={item._id} style={{ margin: '8px 0px' }}>
                  <Brand data={item} />
                </Col>
              );
            })}
          </Row>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', margin: '16px 0'
        }} onClick={() => setBrandsList(data)}>
          < Button style={{ width: 240, padding: '8px 12px', borderRadius: 4, border: '1px solid #0d5cb6', height: 38, color: '#0d5cb6', fontSize: 13 }}> Xem Thêm</Button>
        </div>
      </div >
    </div >
  );
};

export default BrandWidget;
