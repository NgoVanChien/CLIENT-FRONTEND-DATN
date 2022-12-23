import { Category } from "../../../components";
import "./style.scss";
import COMMON_API from "../../../api/common";
import { useEffect, useState } from "react";
import { Button } from "antd";

const FeatureCategories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    (async function () {
      try {
        const response = await COMMON_API.getAllCategory();
        setData(response.data)
        setCategoriesList(response.data?.slice(0, 8));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div id="feature_categories__home">
      <div className="feature_categories__home__wrap">
        <div className="feature_categories__header">Danh Mục Nổi Bật</div>
        <div className="feature_categories__list">
          {categoriesList?.map((item) => {
            return (
              <div className="feature_categories__item" key={item._id}>
                <Category data={item} />
              </div>
            );
          })}

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0', paddingBottom: 32 }} onClick={() => setCategoriesList(data)}>
          <Button>Xem thêm</Button>
        </div>
      </div>

    </div>
  );
};

export default FeatureCategories;
