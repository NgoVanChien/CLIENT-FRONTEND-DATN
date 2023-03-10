import {
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { Button, Form, Input, notification, Radio } from 'antd';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import USER_API from '../../../../api/user';
import LoadingSection from '../../../../components/LoadingSection';
import { STATUS_FAIL, STATUS_OK } from '../../../../constants/api';
import { BISEXUAL, FEMALE, MALE } from '../../../../constants/gender';
import { commonActions } from '../../../../store/common';
import { fullnameReg } from '../../../../utils/validations';
import AddressUpdate from '../AddressUpdate';
import EmailUpdate from '../EmailUpdate';
import PasswordUpdate from '../PasswordUpdate';
import PhoneUpdate from '../PhoneUpdate';
import UpdateItem from '../UpdateItem/UpdateItem';
import './style.scss';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const Account = () => {
  const [form] = Form.useForm();
  const { userInfo } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const submit = async (values) => {
    try {
      const payloadData = _.omitBy(values, (value) => {
        if (value || value?.trim() !== '') return false;
        return true;
      });

      if (payloadData.last_name)
        payloadData.last_name = payloadData.last_name.trim();
      if (payloadData.first_name)
        payloadData.first_name = payloadData.first_name.trim();
      if (payloadData.address) payloadData.address = payloadData.address.trim();
      if (payloadData.password)
        payloadData.password = payloadData.password.trim();

      const response = await USER_API.updateUser(userInfo._id, payloadData);

      if (response.status === STATUS_FAIL)
        return notification.error({
          placement: 'topRight',
          message: 'Can not update user!',
          description: response.message,
          duration: 3,
        });

      dispatch(commonActions.setUserInfo(response.data));
      return notification.success({
        placement: 'topRight',
        message: 'Success',
        description: 'C???p nh???t th??nh c??ng!',
        duration: 3,
      });
    } catch (error) {
      return console.log(error.message);
    }
  };

  const submitUpdatePassword = async (values) => {
    const { old_password, new_password } = values;
    try {
      const response = await USER_API.updatePassword(userInfo._id, {
        old_password,
        new_password,
      });

      if (response.status === STATUS_OK)
        notification.success({
          placement: 'topRight',
          message: 'Update password success!',
          description: response.message,
          duration: 3,
        });
      else
        notification.error({
          placement: 'topRight',
          message: 'L???i',
          description: response.message,
          duration: 3,
        });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="account">
      {!userInfo?._id ? (
        <LoadingSection />
      ) : (
        <>
          <div className="account__left">
            <div className="account-heading">
              <p>Th??ng tin c?? nh??n</p>
            </div>
            <div className="account__left-form">
              <Form
                {...formItemLayout}
                form={form}
                name="account"
                colon={false}
                onFinish={submit}
                requiredMark={false}
                scrollToFirstError
                initialValues={{ sex: userInfo.sex }}
              >
                <div className="user__name__fields-container">
                  <Form.Item
                    name="last_name"
                    colon={false}
                    label="H???"
                    labelAlign="left"
                    rules={[
                      {
                        pattern: fullnameReg,
                        message: 'H??? & T??n kh??ng ???????c bao g???m k?? t??? ?????c bi???t.',
                      },
                    ]}
                  >
                    <Input placeholder={userInfo.last_name} />
                  </Form.Item>
                  <Form.Item
                    name="first_name"
                    colon={false}
                    label="T??n"
                    labelAlign="left"
                    style={{ marginLeft: 16 }}
                    rules={[
                      {
                        pattern: fullnameReg,
                        message: 'H??? & T??n kh??ng ???????c bao g???m k?? t??? ?????c bi???t.',
                      },
                    ]}
                  >
                    <Input placeholder={userInfo.first_name} />
                  </Form.Item>
                </div>
                <Form.Item
                  name="sex"
                  colon={false}
                  label="Gi???i t??nh"
                  labelAlign="left"
                >
                  <Radio.Group value={userInfo.sex} >
                    <Radio value={MALE}>Nam</Radio>
                    <Radio value={FEMALE}>N???</Radio>
                    <Radio value={BISEXUAL}>Kh??c</Radio>
                  </Radio.Group>
                </Form.Item>
                <Button
                  style={{ marginLeft: 'auto', display: 'block' }}
                  type="primary"
                  htmlType="submit"
                >
                  L??u thay ?????i
                </Button>
              </Form>
            </div>
          </div>
          <div className="account__right">
            <div className="update-list">
              <div className="account-heading">
                <p>Th??ng tin chi ti???t</p>
              </div>
              <UpdateItem
                icon={<PhoneOutlined />}
                title="S??? ??i???n tho???i"
                content={userInfo.phone}
                btnContent="C???p nh???t"
                component={
                  <PhoneUpdate
                    onSubmit={submit}
                    initialValue={userInfo.phone}
                  />
                }
              />
              <UpdateItem
                icon={<MailOutlined />}
                title="?????a ch??? email"
                content={userInfo.email}
                btnContent="C???p nh???t"
                component={
                  <EmailUpdate
                    onSubmit={submit}
                    initialValue={userInfo.email}
                  />
                }
              />
              <UpdateItem
                icon={<EnvironmentOutlined />}
                title="?????a ch???"
                btnContent="C???p nh???t"
                content="C???p nh???t ?????a ch??? nh???n h??ng"
                component={
                  <AddressUpdate onSubmit={submit} initialValue={{}} />
                }
              />
            </div>
            <div className="update-list">
              <div className="account-heading">
                <p>B???o m???t</p>
              </div>
              <UpdateItem
                icon={<LockOutlined />}
                title="Thi???t l???p m???t kh???u"
                btnContent="C???p nh???t"
                component={<PasswordUpdate onSubmit={submitUpdatePassword} />}
              />
            </div>
          </div>
        </>
      )
      }
    </div >
  );
};

export default Account;
