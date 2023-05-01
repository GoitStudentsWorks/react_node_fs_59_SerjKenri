import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, ButtonDifference } from 'core/kit/Button';
import { changePass } from 'redux/operations';
import { Input } from 'core/kit/Input';
import { useTranslation } from 'react-i18next';
import { userUpdPassSchema } from 'schemas/userPassUpdValidation';

export const ChangeUserPass = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (values, { resetForm }) => {
        dispatch(
            changePass({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            })
        );
        resetForm();
        navigate('/account');
    };
    return (
        <Container>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                validationSchema={userUpdPassSchema}
                onSubmit={onSubmit}
            >
                {({
                    errors,
                    touched,
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                }) => (
                    // <LoginFormWrap>
                    <LoginFormContainer>
                        <Form autoComplete="off" onSubmit={handleSubmit}>
                            <LoginFormTitle>
                                {t('chengePassPage.labelTitleName')}
                            </LoginFormTitle>
                            <Input
                                name="currentPassword"
                                type="password"
                                labelTitle={t('chengePassPage.oldPassword')}
                                placeholder={t(
                                    'chengePassPage.oldPassPlaceholder'
                                )}
                                labelTextStyle={{
                                    fontWeight: '600',
                                    lineHeight: '15px',
                                    marginBottom: '2px',
                                    marginTop: '24px',
                                }}
                                inputStyle={{
                                    borderRadius: '8px',
                                    height: '46px',
                                    border:
                                        touched.currentPassword &&
                                        errors.currentPassword
                                            ? '1px solid #E74A3B'
                                            : '1px solid rgba(220, 227, 229, 0.6)',
                                }}
                                handleBlur={handleBlur}
                                onChange={handleChange}
                                value={values.currentPassword}
                                error={
                                    touched.currentPassword &&
                                    errors.currentPassword
                                        ? errors.currentPassword
                                        : ''
                                }
                            />

                            <Input
                                name="newPassword"
                                type="password"
                                labelTitle={t('chengePassPage.newPassword')}
                                placeholder={t(
                                    'chengePassPage.newPassPlaceholder'
                                )}
                                labelTextStyle={{
                                    fontWeight: '600',
                                    lineHeight: '15px',
                                    marginBottom: '2px',
                                    marginTop: '24px',
                                }}
                                inputStyle={{
                                    borderRadius: '8px',
                                    height: '46px',
                                    border:
                                        touched.newPassword &&
                                        errors.newPassword
                                            ? '1px solid #E74A3B'
                                            : '1px solid rgba(220, 227, 229, 0.6)',
                                }}
                                handleBlur={handleBlur}
                                onChange={handleChange}
                                value={values.newPassword}
                                error={
                                    touched.newPassword && errors.newPassword
                                        ? errors.newPassword
                                        : ''
                                }
                            />
                            <Input
                                name="confirmPassword"
                                type="password"
                                labelTitle={t('chengePassPage.confNewPass')}
                                placeholder={t(
                                    'chengePassPage.confPassPlaceholder'
                                )}
                                labelTextStyle={{
                                    fontWeight: '600',
                                    lineHeight: '15px',
                                    marginBottom: '2px',
                                    marginTop: '24px',
                                }}
                                inputStyle={{
                                    borderRadius: '8px',
                                    height: '46px',
                                    border:
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                            ? '1px solid #E74A3B'
                                            : '1px solid rgba(220, 227, 229, 0.6)',
                                }}
                                handleBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                                error={
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                        ? errors.confirmPassword
                                        : ''
                                }
                            />
                            <Button
                                type="submit"
                                differentStyles={ButtonDifference.primary}
                                disabled={
                                    values.newPassword.length > 0 &&
                                    values.newPassword ===
                                        values.confirmPassword
                                        ? false
                                        : true
                                }
                                title={t('chengePassPage.labelTitleName')}
                                buttonStyle={{
                                    backgroundColor: '#3e85f3',
                                    width: '287px',
                                    height: '46px',
                                    marginTop: '32px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                                textStyle={{
                                    margin: '0',
                                }}
                            ></Button>
                        </Form>
                        {/* <AuthNavigate
                            route={ROUTING.REGISTER}
                            content="Sign up"
                        /> */}
                        {/* <LoginImg
                                srcset={`${GooseLogIn} 1x, ${GooseLogIn2x} 2x`}
                                src={`${GooseLogIn}`}
                                alt="goose"
                            /> */}
                    </LoginFormContainer>
                    /* </LoginFormWrap> */
                )}
            </Formik>
        </Container>
    );
};

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Form = styled.form(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 24px',
    width: '335px',
    marginBottom: '18px',
    backgroundColor: theme.color.mainBackgroundColor,
    borderRadius: '8px',

    [theme.media.up(`${theme.breakpoints.m}px`)]: {
        padding: '40px',
        width: '480px',
        marginBottom: '24px',
    },
}));

const LoginFormTitle = styled.h1`
    ${({ theme }) => `
    margin: auto;
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
        color: ${theme.color.accentTextColor};
        text-shadow: 0px 47px 355px rgba(0, 0, 0, 0.07)
        0px 9.4px 57.6875px rgba(0, 0, 0, 0.035);
        margin-bottom: 8px;
        
        @media (min-width: 768px) {
            font-size:24px;
        }`}
`;

const Container = styled.div(({ theme, isTablet, isDesktop }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: theme.color.calendarCellColor,
    paddingTop: '40px',
    paddingBottom: isTablet ? '40px' : '60px',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    width: '335px',
    height: '653px',
    borderRadius: '16px',
    [theme.media.between(
        `${theme.breakpoints.m}px`,
        `${theme.breakpoints.l}px`
    )]: {
        width: '704px',
        height: '854px',
        paddingBottom: '40px',
    },
    [theme.media.up(`${theme.breakpoints.l}px`)]: {
        width: '1087px',
        height: '752px',
        paddingTop: '60px',
        paddingBottom: '60px',
    },
}));
