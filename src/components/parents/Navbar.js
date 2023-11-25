import React, { useCallback, useState } from 'react';
import css from './css/Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Logos from '../../assets/JakartaLogo1.png';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, message } from 'antd';
import { logout } from '../../utils/Axios';
import authAction from '../../redux/actions/auth';

function Navbar() {
  const profile = useSelector((state) => state.auth.profile);
  const token = useSelector((state) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      await logout(token);
      dispatch(authAction.resetReducer());
      setIsLoading(false);
      setIsModalOpen(false);
      message.success('Logout Success');
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      message.info(error.response.data.msg);
      setIsLoading(false);
      setIsModalOpen(false);
    }
  }, [token, dispatch, navigate]);

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
          {profile.role == 'customer' ? (
            <>
              <Link to='/dashboard' className={css.list}>
                Dashboard
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/profile' className={css.list}>
                Profile
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/lapangan' className={css.list}>
                Booking Fields
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/lapangan' className={css.list}>
                Payment Field Fields
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/historypayment' className={css.list}>
                History Payment
              </Link>
            </>
          ) : profile.role == 'owner' ? (
            <>
              <Link to='/dashboard' className={css.list}>
                Dashboard
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/profile' className={css.list}>
                Profile
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/fields' className={css.list}>
                Fields
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/paymentowner' className={css.list}>
                Payment
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='#' className={css.list}>
                History Payment
              </Link>
            </>
          ) : profile.role == 'admin' ? (
            <>
              <Link to='/dashboard' className={css.list}>
                Dashboard
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='#' className={css.list}>
                Suspend Account
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='#' className={css.list}>
                Management
              </Link>
            </>
          ) : null}
          {token != null ? (
            <>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Button
                type='primary'
                danger
                onClick={() => setIsModalOpen(true)}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <p to='#' className={css.Pembatas}>
                |
              </p>
              <Link to='/' className={css.list}>
                Login
              </Link>
              <p to='#' className={css.Pembatas}>
                |
              </p>
            </>
          )}
        </div>
        <Modal
          width={400}
          title='Apakah anda yakin ingin keluar?'
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleLogout}
          footer={[
            <Button type='primary' danger onClick={handleLogout}>
              Logout
            </Button>,
            <Button type='primary' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
          ]}
        />
      </div>
    </>
  );
}

export default Navbar;