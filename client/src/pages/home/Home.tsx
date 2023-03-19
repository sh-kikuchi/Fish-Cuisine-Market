import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Stack, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView, TreeItem } from '@mui/lab';

function Home() {
  useEffect(() => {
    let data = localStorage.getItem('data');
    if (!data || data === null || data === undefined) {
      window.location.href = "/login"
    }
  });
  const handleMoveIntroductionPage = () => {
    window.location.href = "/introduction";
  }
  const handleMoveStoreListPage = () => {
    window.location.href = "/store/list";
  }
  const handleMoveLandscapePage = () => {
    window.location.href = "/imageList/landscape/toyosu";
  }
  const handleMoveMealPicturePage = () => {
    window.location.href = "/imageList/meal/fish";
  }
  return (
    <div className="Home">
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <Box textAlign="center" sx={{ mb: 5 }} fontSize={20}>
          お品書き
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={7}>
              <img src={require(`../../images/home.png`)} />
            </Grid>
            <Grid xs={4}>
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1 }}
              >
                <TreeItem nodeId="1" label="01_アプリについて" sx={{ my: 2 }} onClick={handleMoveIntroductionPage}></TreeItem>
                <TreeItem nodeId="2" label="02_各種登録">
                  <TreeItem nodeId="3" label="リストから登録する" sx={{ my: 1 }} onClick={handleMoveStoreListPage} />
                </TreeItem>
                <TreeItem nodeId="4" label="03_図鑑" sx={{ my: 2 }}>
                  <TreeItem nodeId="5" label="お魚（定食）図鑑" sx={{ my: 1 }} onClick={handleMoveMealPicturePage} />
                  <TreeItem nodeId="6" label="豊洲憧憬" sx={{ my: 1 }} onClick={handleMoveLandscapePage} />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div >
  );
}
export default Home;
