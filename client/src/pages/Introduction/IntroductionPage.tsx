/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import homePic from "../../images/home.png"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Stack, Typography } from '@mui/material';

function Introduction() {
  //breadcrumb
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
      href="/">
      TOP
    </Link>,
    <Typography key="3" color="text.primary">
      アプリについて
    </Typography>,
  ];
  useEffect(() => {
    //トークン取得
    let data = localStorage.getItem('data');
    console.log(data);
    if (!data || data === null || data === undefined) {
      window.location.href = "/login"
    }
  });
  return (
    <div style={{ height: 400, width: '100%', marginTop: '10px' }} >
      <Stack spacing={2} sx={{ marginLeft: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Container sx={{ marginTop: 5 }} >
        <Card sx={{ maxWidth: '600px', margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h2" component="div" sx={{ marginBottom: 3 }}>
              <Box textAlign="center" sx={{ mb: 5 }} fontSize={20}>
                このアプリについて
              </Box>
              <Box sx={{ mb: 5 }} fontSize={16}>
                「お魚（定食）図鑑」は、お魚定食を記録するためのウェブアプリケーションです。着想は2022年。豊洲の複数のIT現場で、死にそうになりながら身に着けたフロントエンドとサーバーサイドの言語、フレームワーク、ライブラリを用いて何か「豊洲」という土地柄を活かしたアプリを作れないかという思いに至りました。豊洲といえば、、、豊洲市場。お魚がたくさん並ぶ場所があります。しかしながらお魚のデータを集めるのは、なかなか骨が折れるわけです。どうしたものかと思って散歩していたところ、お魚の定食を食べて記録していくのはどうだろうかと考えました。なんてくだらないのでしょうとか、誰得？とか、そんなのくそくらえでございます。とにかく経験を個人開発に昇華した姿とこのクソアプリをとくとご覧あれ。
              </Box>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h2" component="div" sx={{ marginBottom: 3 }}>
              <Box textAlign="center" sx={{ mb: 5 }} fontSize={20}>
                豊洲の経験
              </Box>
              <Box sx={{ mb: 5 }} fontSize={16}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="＋messageの親子向け広告配信サービスの入稿システム開発" secondary="2022.1-2022.3" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="ヘルスケアアプリのAPI作成" secondary="2022.4-2022.5" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="医療電子カルテのシステム改修" secondary="2022.7-2022.9" />
                  </ListItem>
                </List>
              </Box>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h2" component="div" sx={{ marginBottom: 3 }}>
              <Box textAlign="center" sx={{ mb: 5 }} fontSize={20}>
                使用言語・フレームワーク
              </Box>
              <Box sx={{ mb: 5 }} fontSize={16}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LaptopChromebookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="フロントエンド: React, TypeScript" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LaptopChromebookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="サーバーサイド: Express.js, TypeScript" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LaptopChromebookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="ライブラリ: Redux" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LaptopChromebookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="データベース: PostgresQL" />
                  </ListItem>
                </List>
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
export default Introduction;
