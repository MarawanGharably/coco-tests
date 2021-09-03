import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { setSelectedFolderAction } from '../../../../store/actions/productLibraryActions';
import styles from './ProductList.module.scss';
import Product from "./Product";



const ProductList = ({ productLibrary, setSelectedFolderAction }) => {
    const { folders, selectedFolder } = productLibrary;


    const router = useRouter();
    const {id:storeId} = router.query;

    const handleFolderChange = (selected) => {
        setSelectedFolderAction(selected);
    };


    return (
      <div className={styles["product-list"]}>

          <Select
            id="folderSelector"
            instanceId="folderSelector"
            className={styles["selector"]}
            options={folders.map(item => ({
                  label: item.name,
                  value: item._id,
                  products: item.products
              })
            )}
            value={selectedFolder}
            onChange={handleFolderChange}
          />


          <div className={styles["list"]}>

              {selectedFolder?.products?.length ?
                selectedFolder?.products?.map(({ _id, image, folder }, i) => (
                  <Product key={i} id={_id} storeId={storeId} image={image}
                           folder={folder} />
                ))
                : <span>Folder is empty</span>
              }
          </div>
      </div>
    );
};



ProductList.propTypes = {
    setSelectedFolderAction: PropTypes.func.isRequired,
    productLibrary: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.object).isRequired,
        folders: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedFolder: PropTypes.shape({}),
    }).isRequired,
};



export default connect(null,{ setSelectedFolderAction })(ProductList);
