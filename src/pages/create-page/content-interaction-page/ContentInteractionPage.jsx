import React from 'react';
import Page from '../../../layouts/page-template/Page';
import PageRow from '../../../components/page-row/PageRow';
import PageItem from '../../../components/page-item/PageItem';
import RightSideBar from '../../../components/right-side-bar/RightSideBar';
import ContentSideBarItem from '../../../components/right-side-bar/ContentSideBarItem';
import SceneNavigator from '../../../components/scene-navigator/SceneNavigator';
import { EditorDataStore } from '../../../data-store/editor-data-store/EditorDataStore';

const ContentInteractionPage = () => (
    <EditorDataStore>
        <Page
            pageTitle="Content Interactions"
            pageSubTitle="Choose where you'd like to place each content interaction"
        >
            <PageRow width="85%">
                <SceneNavigator />
            </PageRow>
            <PageRow>
                <PageItem>
                    <div>This is a page content upload slot</div>
                </PageItem>
                <PageItem>
                    <div>This is a page content upload slot</div>
                </PageItem>
                <PageItem>
                    <div>This is a page content upload slot</div>
                </PageItem>
            </PageRow>
        </Page>
        <RightSideBar cols="1" rowHeight="15em">
            <ContentSideBarItem name="Image 1" />
            <ContentSideBarItem name="Image 2" />
            <ContentSideBarItem name="Video 1" />
        </RightSideBar>
    </EditorDataStore>
);

export default ContentInteractionPage;
