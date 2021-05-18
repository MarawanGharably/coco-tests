import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import FancyButton from '../fancy-button/FancyButton';
import {
    Container,
    Title,
    Content,
    Actions,
    buttonStyle,
    cancelButtonStyle,
    cancelTextStyle,
} from './styles';

const DeleteDialog = ({
    title, content, onClose, handleDelete,
}) => (
    <Modal onClose={onClose}>
        <Container>
            <Title>{title}</Title>
            <Content>{content}</Content>

            <Actions>
                <FancyButton
                    text="YES"
                    buttonStyle={buttonStyle}
                    onClick={handleDelete}
                />
                <FancyButton
                    text="CANCEL"
                    buttonStyle={[buttonStyle, cancelButtonStyle]}
                    textStyle={cancelTextStyle}
                    onClick={onClose}
                />
            </Actions>
        </Container>
    </Modal>
);

DeleteDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

DeleteDialog.defaultProps = {
    title: '',
    content: '',
};

const withOpen = (Component) => (props) => (
    props.isOpen && <Component {...props} /> //eslint-disable-line
);

const DialogWithOpen = withOpen(DeleteDialog);

export default DialogWithOpen;
