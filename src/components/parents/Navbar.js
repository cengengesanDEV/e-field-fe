import React, { Fragment } from 'react';
import css from './css/Navbar.module.css';
import { Link } from 'react-router-dom';
import Logos from '../../assets/JakartaLogo1.png';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import useNavigationMenu from '../../hooks/useNavigationMenu';
import { useLogout } from '../../hooks/useLogout';

function Navbar() {
  const token = useSelector((state) => state.auth.token);

  const navigationMenu = useNavigationMenu();
  const { isLoading, isModalOpen, setIsModalOpen, handleLogout } =
    useLogout(token);

  return (
    <>
      <div className={css.headNavbar}>
        <img
          src={Logos}
          alt='logoJakarta'
          width={'50px'}
          height={'50px'}
          style={{ backgroundSize: 'cover' }}
        />
        <p className={css.title}>Soccer Fields DKI Jakarta</p>
        <img
          src={Logos}
          alt='logoJakarta'
          width={'50px'}
          height={'50px'}
          style={{ backgroundSize: 'cover' }}
        />
      </div>
      <div className={css.headListNavbar}>
        <div className={css.bodyList}>
          {!navigationMenu
            ? null
            : navigationMenu.map((item, index, array) => (
                <Fragment key={index}>
                  {index > 0 && index < array.length && (
                    <p className={css.Pembatas}>|</p>
                  )}
                  <Link to={item.to} className={css.list}>
                    {item.label}
                  </Link>
                </Fragment>
              ))}
          {token != null ? (
            <>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Button
                type='primary'
                danger
                onClick={() => setIsModalOpen(true)}
                icon={<i className='fa-solid fa-right-from-bracket'></i>}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to='/lapanganview' className={css.list}>
                Fields
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/' className={css.list}>
                Login
              </Link>
            </>
          )}
        </div>
        <Modal
          width={400}
          title='Apakah anda yakin ingin keluar?'
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          confirmLoading={isLoading}
          onOk={handleLogout}
          footer={[
            <Button
              type='primary'
              danger
              onClick={handleLogout}
              icon={<i className='fa-solid fa-right-from-bracket'></i>}
            >
              Logout
            </Button>,
            <Button
              type='primary'
              onClick={() => setIsModalOpen(false)}
              icon={<CloseCircleOutlined />}
            >
              Cancel
            </Button>,
          ]}
        />
      </div>
    </>
  );
}

export default Navbar;
