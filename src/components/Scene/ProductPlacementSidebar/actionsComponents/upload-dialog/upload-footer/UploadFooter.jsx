import React, {useState}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import { addProductImageToFolder, setSelectedFolder } from '../../../../../../APImethods';
import styles from './UploadFooter.module.scss';

const UploadFooter = ({ images, closeDialog, setErrors }) => {
    const { folders, selectedFolder } = useSelector((state) => state['productLibrary']);
    const [isLoading, setLoading ] = useState();

    const dispatch = useDispatch();
    const router = useRouter();
    const { id: storeId } = router.query;
    const buttonText = isLoading ? 'Uploading...' : 'Upload';
    const options = folders.map(item=>({label:item.name, value:item._id}) );



    const parsePostData = (images) => {
        const folderId = selectedFolder.value;
        return images.map((image) => ({
            content: image.content,
            filename: image.filename,
            remove_background: image.remove_background,
            folder: folderId
        }));
    };



    const onSubmit = async () => {
        if (isLoading) return;

        const postData = parsePostData(images);
        setLoading(true);
        setErrors(false);

        dispatch(addProductImageToFolder(storeId, selectedFolder.value, postData))
            .then((records)=>{
                //Yash's comment
                console.log(
                    "=> TODO: parse this response and show appropriate success/error " +
                    "messages before closing the dialog. " +
                    "After closing refresh product library using getProductLibrary",
                    records);

                closeDialog();
            })
            .catch((err)=>{
                console.log('>%c Upload Error', 'color:red', err);
                setErrors(err);
            })
            .finally(()=>{
                setLoading(false);
            });
    };

    return (
        <div className={styles.cmp}>
            <Select
                className={styles["selector"]}
                placeholder="Select Folder or type to create a new one"
                options={[...options]}
                value={selectedFolder}
                isDisabled={isLoading}
                onChange={(selected)=> dispatch(setSelectedFolder(selected, storeId))}
            />
            <Button variant="primary" onClick={onSubmit}>
                {buttonText}
            </Button>
        </div>
    );
};


UploadFooter.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        filename: PropTypes.string,
    })).isRequired,
    closeDialog: PropTypes.func.isRequired,
};


export default UploadFooter;
