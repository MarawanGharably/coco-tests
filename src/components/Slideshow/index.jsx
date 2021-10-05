import React, { useEffect, useState, useRef } from 'react';
import { debounce } from '../../utils/events';
import styles from './slideshow.module.scss';

/**
 *
 * @param step - amount of items to scroll in one scroll event
 * @param className - extra class to customize the styling
 * @param children - <div> elements used to display Slideshow items
 * @returns {JSX.Element}
 * @constructor
 * Example: <Slideshow step={10} className='extraClassName'>...elements here ..</Slideshow>
 */
const Slideshow = ({ step=5, className='', children }) => {
    const navigatorRef = useRef();
    const scrollableElRef = useRef();
    const wrapperElRef = useRef();



    //Compute Slideshow element/slide width
    const item = wrapperElRef.current?.children[0];
    const itemExtraSpacings= calcExtraSpacings(item);
    const itemWidth = item?.clientWidth + itemExtraSpacings || 300;
    const scrollStep = itemWidth * step;

    const [scrollData, setScrollData] = useState({
        scrollLeft: 0,
        endReached: false,
    });

    const scrollEvent = (direction = 'left') => {
        const scrollVal = scrollableElRef.current?.scrollLeft;
        let newVal = 0;
        if (direction == 'left' && scrollVal > 0) {
            newVal = scrollVal - scrollStep > 0 ? scrollVal - scrollStep : 0;
            if (newVal > 0 && newVal < scrollStep) newVal = 0; //scroll to beginning
        }
        if (direction == 'right') newVal = scrollVal + scrollStep;


        scrollableElRef.current.scrollLeft = newVal;
        setTimeout(() => {
            const { scrollLeft, offsetWidth, scrollWidth } = scrollableElRef.current;

            setScrollData({
                scrollLeft,
                endReached: !!(offsetWidth + scrollLeft >= scrollWidth - 30),
            });
        }, 500);

        // looks amazing but elements not scrolled manually anymore
        // wrapperElRef.current.a = wrapperElRef.current.a ? wrapperElRef.current.a +10 : 10;
        // wrapperElRef.current.style.transform =`translateX(-${wrapperElRef.current.a}%)`;
    };

    useEffect(() => {
        const handleResize = debounce(() => {
            const { scrollLeft, offsetWidth, scrollWidth } = scrollableElRef.current;
            // console.log('handleResize', scrollableElRef );
            setScrollData({
                scrollLeft,
                endReached: !!(offsetWidth + scrollLeft >= scrollWidth - 30),
            });
        }, 500);

        const handleScroll = debounce(() => {
            const { scrollLeft, offsetWidth, scrollWidth } = scrollableElRef.current;
            // console.log('scroll', {scrollLeft, offsetWidth, scrollWidth} );

            setScrollData({
                scrollLeft,
                endReached: !!(offsetWidth + scrollLeft >= scrollWidth - 30),
            });
        }, 500);

        //Add listeners
        window.addEventListener('resize', handleResize);
        scrollableElRef.current.addEventListener('scroll', handleScroll);

        return function cleanUp() {
            window.removeEventListener('resize', handleResize);
            scrollableElRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div ref={navigatorRef} className={`${styles['slideshow']} ${className}`}>
            <ScrollBtn direction="left" onClick={(e) => scrollEvent('left')} status={scrollData.scrollLeft >= 200 ? true : false} />

            <div ref={scrollableElRef} className={styles.scrollable}>
                <div ref={wrapperElRef} className={styles.scrollableContainer}>
                    {children}
                </div>
            </div>

            <ScrollBtn
                direction="right"
                onClick={(e) => scrollEvent('right')}
                status={scrollData.endReached || wrapperElRef?.current?.clientWidth < navigatorRef?.current?.clientWidth ? false : true}
            />
        </div>
    );
};

const ScrollBtn = ({ direction, status, onClick }) => {
    return (
        <div className={`${styles.scrollBtn} ${styles[direction]} ${status ? styles.active : ''}`}>
            {direction == 'right' && <i onClick={onClick} className="fas fa-chevron-right"></i>}
            {direction == 'left' && <i onClick={onClick} className="fas fa-chevron-left"></i>}
        </div>
    );
};


//TODO: incomplete
const calcExtraSpacings=(item)=>{
    if(!item) return 0;
    let res=0;

    const itemStyles = getComputedStyle(item);
    if(itemStyles['margin-right']) res+= parseInt(itemStyles['margin-right']);
    if(itemStyles['margin-left']) res+= parseInt(itemStyles['margin-left']);
    return res;
}

export default Slideshow;
