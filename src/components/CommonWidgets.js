import React from 'react';
import {
  Platform,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  Linking,
  Alert,
  TouchableOpacity } from 'react-native'; 
import geolib from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n'; 
import CT from '@src/constants';
import { Metrics, Styles, Icons, Colors, Fonts, Images , } from '@theme/';
import Utils from '@src/utils';
import styles from './styles';  

const CommonWidgets = {
  
  
  renderSpacer(count) {
    return (
      <View style={{ height:  count }} />
    );
  },
  _renderSpacer(count) {
    return (
      <View style={{ height: (Metrics.screenHeight / 40) * count }} />
    );
  },


renderMaterialButton(text, color, onPress, loading = false) {
    return (
      <TouchableOpacity
        style={[Styles.button, { backgroundColor: color }]}
        onPress={!loading ? onPress : null}>
        {!loading ?
          <Text style={Fonts.style.buttonText}>
            {text}
          </Text> :
          <ActivityIndicator
            color={Colors.textPrimary} />}
      </TouchableOpacity>
    );
  },
  navigate(data){
    const wazeUrl = `waze://?ll=${data._GPS_Lat},${data._GPS_Lng}&navigate=yes`;
    Linking.canOpenURL(wazeUrl).then(supported => {
      if (!supported) {
          if(Platform.OS==='android')
              return Linking.openURL("market://details?id=com.waze");
          else
              return Linking.openURL("http://itunes.apple.com/us/app/id323229106");
      } else {
        return Linking.openURL(wazeUrl).catch(err=>alert('s'));
      }
    }).catch(err => console.error('An error occurred', err));
  },
  renderCell(data, id, curPos= {latitude: 51.5103, longitude: 7.49347}, onPress){
    var dist = geolib.getDistance(
      curPos,
      {latitude: data._GPS_Lat, longitude: data._GPS_Lng}
    ); 
    dist = dist / 1000;
    dist = dist.toFixed(2);
     return(
      <TouchableOpacity onPress={()=>onPress(data)} key={id} style={{flexDirection: 'row', padding:15, borderBottomWidth:1, borderColor: Colors.blue, alignItems: 'center'}}>
        <View style={{flexDirection: 'column', flex:1}}>
          <Text style={{...Fonts.style.h5, color: Colors.text}}>{data._Customer_Name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{...Fonts.style.h5, color: Colors.text}}>{data._Customer_ID}</Text>
            <Text style={{...Fonts.style.h5, color: Colors.text}}>{dist}KM</Text>
          </View>
        </View>
         
        <TouchableOpacity onPress={()=>{this.navigate(data)}}>
          <Text style={{...Fonts.style.h4, marginLeft: Metrics.screenWidth/5, color: Colors.text}}>
            GO
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  },
 
  renderTextButton(text,color, onPress, bdCol)
  {
    return (
      <TouchableOpacity
        style={[Styles.center,
          { paddingVertical:20, width: Metrics.screenWidth * 0.4, margin: 20, backgroundColor: color, borderWidth:3, borderColor: bdCol,borderRadius: 3 }]}
        backgroundColor={color} 
        onPress={onPress}>
        <Text style={[Fonts.style.h3, { color: Colors.textPrimary }]}>
          {text} 
        </Text>
      </TouchableOpacity>
    );
  },
  renderConfirmDlg(text, visibility, scale, translateX, hideModal) {
    return (
      <Animated.Modal
        visible={visibility}
        style={[Styles.modal, { transform: [{ scale }, { translateX }] }]} >
        
        <View style={styles.modalContainer}> 
          <View style={{ padding: Metrics.defaultPadding }}>
            <View style={{...Styles.center,flexDirection: 'column'}}>
              <View style={{...Styles.center, flex:1}}>
              <Text style={{...Fonts.style.h3, alignSelf: 'center', color: Colors.textPrimary,flex:1,}}>
                {text}
              </Text>
              </View>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this.renderTextButton('OK', Colors.textBlue, ()=>hideModal(1))}
                {this.renderTextButton('Cancel', Colors.textBlue, ()=>hideModal(0))}
              </View> 
            </View> 
          </View>
        </View>
      </Animated.Modal>
    );
  },
  renderCountDown(secVal,buyLimit, onStart, onIncreaseBuytime)
  {
    
    let sec = secVal % 60;
    if(sec<10) sec=`0${sec}`
    let mins = secVal/60;
    let min = parseInt(mins);
    if(min<10) min=`0${min}`

    return(
          <View style={{ flexDirection: 'row',justifyContent: 'space-between',margin: Metrics.defaultMargin, paddingVertical: Metrics.defaultMargin, borderRadius:5, borderWidth:1, borderColor: Colors.textPrimary}}>
            <View style={{...Styles.center, flex:1, flexDirection:'column'}}>
              <Text style={{...Fonts.style.h3, color:Colors.textPrimary}}>Time</Text>
              <Text style={{...Fonts.style.h3, color:Colors.textPrimary}}>{min}:{sec}</Text>
            </View>
            <View style={{...Styles.center,backgroundColor:Colors.textBlue, flex:1}}>
              <TouchableOpacity
              style={{backgroundColor: Colors.textBlue }}
              onPress={onStart}>
                <Text style={{...Fonts.style.h2, color:Colors.textPrimary}}>
                  START
                </Text>  
              </TouchableOpacity>
            </View>
            <View style={{...Styles.center, flex:1, flexDirection:'column'}}>
              <Text style={{...Fonts.style.h3, flex:1, color: Colors.textPrimary}}>Buy Time</Text>
              <View style={{flexDirection:'row',flex:1}}>
                 {this.renderIcon(onIncreaseBuytime, 'arrow-up',20)}
                <Text style={{...Fonts.style.h3, color:Colors.textPrimary}}> {buyLimit} min</Text>
              </View>
            </View> 
          </View>
        )
  },
  renderFeed(item)
  {
    avatarUri=CT.AVATAR_PLACEHOLDER, username="Justin", note="New Post", date='3 days ago',video=null
    let avatarUri = item.from.picture.data.url;
    let username = item.from.name;
    let {message} = item;
    let secDiff = parseInt((new Date() - new Date(item.created_time))/1000);
    console.log(secDiff);
    return(
        <View key={item.id} style={{margin: Metrics.defaultMargin, padding: Metrics.defaultMargin, backgroundColor: Colors.brandSecondary}}>
          <View style={{flexDirection: 'row', alignItems:'center', marginBottom:10}}>     
            <Image style={{marginRight: 20,width: Metrics.smallTeamIcon  , height: Metrics.smallTeamIcon  , resizeMode:'stretch'}} source={{uri:avatarUri}}/>
            <Text style={{...Fonts.style.h4, color:Colors.textSecondary}}>{username}</Text> 
          </View>
          <Text style={{...Fonts.style.h4, color: Colors.textPrimary, marginBottom: 5}}>
            {message}
          </Text>
          {item.type=='photo' && 
          (<Image style={{marginRight: 20,marginBottom: 5,width: Metrics.screenWidth - 4* Metrics.defaultMargin  , height: Metrics.screenHeight/3  , resizeMode:'stretch'}} source={{uri:item.full_picture}}/>)
          }
          {item.type=='video' && 
          (
            <VideoPlayer
                source={{ uri: item.source }} 
                thumbnail={{uri: item.full_picture}}
                repeat={ false } 
                disableFullscreen={true}
                onBack={()=>{}}
                style={{marginRight: 20,marginBottom: 5,width: Metrics.screenWidth - 4* Metrics.defaultMargin  , height: Metrics.screenHeight/3   }}
                paused = {true}
                disableControlsAutoHide= {true}
            />
          )
           
          }
          <Text style={{...Fonts.style.h4, color: Colors.textSecondary}}>    
            {Utils.getDiffString(item.created_time)}
          </Text>
        </View>
    );
  },
  renderRoundScoreBoard(onScore1, onScore2, score1, score2, round, color=Colors.textPrimary )
  {
    return(
      <View key={round} style={{ margin: Metrics.defaultMargin, paddingVertical: Metrics.defaultMargin, borderRadius:5, borderWidth:1, borderColor: Colors.textPrimary}}>
        <Text style={{...Fonts.style.h3, alignSelf: 'center', textAlign:'center',color:Colors.textPrimary , width:Metrics.screenWidth, marginBottom: 10}}>Round{round}</Text>
        <View style={{flexDirection:'row',}}> 
          <View style={{...Styles.center, flex:1, }}>
            {this.renderIcon(onScore1, 'arrow-up',40,color)}
          </View>
          <Text style={{...Fonts.style.h0, flex:1, textAlign:'center', alignSelf:'center',color:Colors.textPrimary}}>
            {score1}
          </Text>
          <Text style={{...Fonts.style.h0, flex:1, textAlign:'center',alignSelf:'center',color:Colors.textPrimary}}>
            :
          </Text>
          <Text style={{...Fonts.style.h0, flex:1, textAlign:'center',alignSelf:'center',color:Colors.textPrimary}}>
            {score2}
          </Text>
          <View style={{...Styles.center, flex:1, }}>
            {this.renderIcon(onScore2, 'arrow-up',40,color)}
          </View>
        </View>
      </View>
    )

  },
  renderFavoriteGame(onPress, imgTeam1, imgTeam2, txtTeam1, txtTeam2, score1, score2, round,key)
  {
    return(
      <TouchableOpacity key={key} onPress={onPress} style={{flexDirection: 'row',paddingLeft: Metrics.defaultMargin, paddingRight: Metrics.defaultMargin, backgroundColor: Colors.brandPrimary, borderBottomColor: 'black', borderBottomWidth: 3, justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', flex:1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
              <Image style={{marginRight: Metrics.defaultMargin, resizeMode: 'stretch', width: Metrics.smallTeamIcon, height: Metrics.smallTeamIcon}} source={{uri: imgTeam1}}/>
              <Text style={{...Fonts.style.h3, color: Colors.textPrimary}}> {txtTeam1}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
              <Image style={{marginRight: Metrics.defaultMargin, resizeMode: 'stretch', width: Metrics.smallTeamIcon, height: Metrics.smallTeamIcon}} source={{uri: imgTeam2}}/>
              <Text style={{...Fonts.style.h3, color: Colors.textPrimary}}> {txtTeam2}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex:1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column',alignItems: 'center' }}>
            <Text style={{...Fonts.style.h3, color: Colors.textPrimary, margin: Metrics.defaultMargin }}> {score1}</Text>
            <Text style={{...Fonts.style.h3, color: Colors.textPrimary, margin: Metrics.defaultMargin }}> {score2}</Text>
          </View>
          <Text style={{...Fonts.style.h4, color: Colors.textBlue}}>
            {round<=4?Utils.getRankString(round):'FINAL'} 
          </Text>
        </View>
         
      </TouchableOpacity> 
    )
  },
  renderWIN(){
    return(
      <View style={{...Styles.center, borderColor: 'rgb(0,255,0)', borderWidth: 1}}>
        <Text style={{...Fonts.style.h3, color: 'rgb(0,255,0)'}}>
          WIN
        </Text>
      </View>
    )
  }
  ,
  renderRoundItem(txtTeam1, txtTeam2, score1, score2, round, win=false, key)
  {
    return(
      <View key={key} style={{flexDirection: 'row',paddingLeft: Metrics.defaultMargin, paddingRight: Metrics.defaultMargin, backgroundColor: Colors.brandPrimary, borderBottomColor: 'black', borderBottomWidth: 3,   alignItems: 'center'}}>
        <View style={{flexDirection: 'column', flex: 2 }}>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
              <Text style={{...Fonts.style.h3, color: Colors.textPrimary, marginRight: 20}}> {score1<10?`0${score1}`:score1}</Text>
              <Text style={{...Fonts.style.h3, color: Colors.textSecondary}}> {txtTeam1}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
              <Text style={{...Fonts.style.h3, color: Colors.textPrimary, marginRight: 20}}> {score2<10?`0${score2}`:score2}</Text>
              <Text style={{...Fonts.style.h3, color: Colors.textSecondary}}> {txtTeam2}</Text>
          </View>
        </View>
        <View style={{flex:2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...Fonts.style.h4, color: Colors.textSecondary}}>
            GAME #{round}
          </Text> 
        </View>
        <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {(win==true)
          ?
           (this.renderWIN())
           :
            (null)}
        </View>
      </View> 
    )
  },
  renderCircle(color = Colors.textBlue, size = Metrics.dotSize){
    return(
      <View style={{width: size, height: size, borderRadius: size/2, backgroundColor: color}}>
      </View>
    )
  },
  renderAdminRoundItem(onPress, imgTeam1, imgTeam2, txtTeam1, txtTeam2,  round,skey){ 
    var bdrCol = Colors.textBlue;
    var bkgCol = Colors.bkgTextBlue;
    if(onPress == null)
    { 
      onPress=()=>{}
      bdrCol = Colors.bdrSetScore;
      bkgCol = Colors.bkgSetScore;
    }
    var roundStr = Utils.getRankString(round) + ' QTR.'
    if( round == 4) roundStr = '';
    return(
      <View key={skey} onPress={onPress} style={{flexDirection: 'row',paddingLeft: Metrics.defaultMargin, paddingRight: Metrics.defaultMargin, backgroundColor: Colors.brandPrimary, borderBottomColor: 'black', borderBottomWidth: 3, justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', flex:1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
              <Image style={{marginRight: Metrics.defaultMargin, resizeMode: 'stretch', width: Metrics.smallTeamIcon, height: Metrics.smallTeamIcon}} source={{uri: imgTeam1}}/>
              <Text style={{...Fonts.style.h3, color: Colors.textPrimary}}> {txtTeam1}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
              <Image style={{marginRight: Metrics.defaultMargin, resizeMode: 'stretch', width: Metrics.smallTeamIcon, height: Metrics.smallTeamIcon}} source={{uri: imgTeam2}}/>
              <Text style={{...Fonts.style.h3, color: Colors.textPrimary}}> {txtTeam2}</Text>
          </View>
        </View>
         
        <TouchableOpacity onPress={onPress} style={{...Styles.center,padding: 3, borderWidth: 1, borderRadius: 3, borderColor: bdrCol, backgroundColor: bkgCol, width: Metrics.screenWidth / 2    }}>
          <Text style={{...Fonts.style.h7, color: bdrCol, alignSelf: 'center'}}>
            ADD {roundStr} FINAL SCORE
          </Text>
        </TouchableOpacity>
    </View>) 
  },
  renderGameItem(game, onPress)
  {
    if (game==undefined) return null;
    if(game.round == 0)//FutureGame
      return(this.renderNearbyGame(()=>onPress(game.key), game.team1.avatarUri, game.team2.avatarUri,game.team1.teamname, game.team2.teamname,Utils.getDateString(game.date),Utils.getTimeString(game.hour,game.minute),game.key));
    else//LiveGame
      return (this.renderFavoriteGame(()=>onPress(game.key),game.team1.avatarUri, game.team2.avatarUri,game.team1.teamname, game.team2.teamname,game.score1, game.score2, game.round,game.key)); 
  },
  renderNearbyGame(onPress, imgTeam1, imgTeam2, txtTeam1, txtTeam2, date, time,key)
  {
    return(
      <TouchableOpacity key={key} onPress={onPress}>
        <View style={{flexDirection: 'row',paddingLeft: Metrics.defaultMargin, paddingRight: Metrics.defaultMargin, backgroundColor: Colors.brandPrimary, borderBottomColor: 'black', borderBottomWidth: 3, justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
                <Image style={{marginRight: Metrics.defaultMargin, resizeMode: 'stretch', width: Metrics.smallTeamIcon, height: Metrics.smallTeamIcon}} source={{uri: imgTeam1}}/>
                <Text style={{...Fonts.style.h3, color: Colors.textSecondary}}> {txtTeam1}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: Metrics.defaultMargin}}>
                <Image style={{marginRight: Metrics.defaultMargin, resizeMode: 'stretch', width: Metrics.smallTeamIcon, height: Metrics.smallTeamIcon}} source={{uri: imgTeam2}}/>
                <Text style={{...Fonts.style.h3, color: Colors.textSecondary}}> {txtTeam2}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text style={{...Fonts.style.h5, color: Colors.textSecondary}}>
              {date}
            </Text>
            <Text style={{...Fonts.style.h4, color: Colors.textSecondary}}>
              {time}
            </Text> 
          </View>
        </View> 
      </TouchableOpacity>
    )
  },
  renderIcon(onPress, icon = 'chevron-left',size=30, color=Colors.textPrimary) {
    let iconName = icon;
    if (icon === 'close') iconName = 'times';
    if (icon == 'menu') iconName = 'bars';
    return (
      <TouchableOpacity
        style={{ paddingBottom: Platform.OS === 'android' ? 5 : 5 }}
        onPress={onPress} >
        <Icon name={iconName} size={size} color={color} />  
      </TouchableOpacity>
    );
  },
  renderNavBarLeftButton(onPress, icon = 'chevron-left') {
    let iconName = icon;
    if (icon === 'close') iconName = 'times';
    if (icon == 'menu') iconName = 'bars';
    return (
      <TouchableOpacity
        style={{ paddingBottom: Platform.OS === 'android' ? 5 : 5 }}
        onPress={onPress} >
        <Icon name={iconName} size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
  renderNavBarRightButton(onPress, icon = 'chevron-left') {
    let iconName = icon;
    if (icon === 'close') iconName = 'times';
    if (icon == 'menu') iconName = 'bars';
    return (
      <TouchableOpacity
        style={{ marginRight: 20, paddingBottom: Platform.OS === 'android' ? 5 : 5 }}
        onPress={onPress} >
        <Icon name={iconName} size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
   
  renderForwardIcon() {
    return (
      <View style={styles.forwardIconContainer}>
        <Icon
          style={{ marginTop: 5 }}
          name={'chevron-right'}
          size={20}
          color={Colors.textThird}
        />
      </View>
    );
  },
   
  renderNavBarLeftButton(onPress, icon = 'chevron-left') {
    let iconName = icon;
    if (icon === 'close') iconName = 'times';
    if (icon == 'menu') iconName = 'bars';
    return (
      <TouchableOpacity
        style={{ paddingBottom: Platform.OS === 'android' ? 5 : 5 }}
        onPress={onPress} >
        <Icon name={iconName} size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
  renderNavBarHeader(headerText) {
    return (
      <View style={Styles.center}>
        <Text
          style={[Fonts.style.h4,
            { textAlign: 'center',
              width: Metrics.screenWidth * 0.7,
              color: Colors.textPrimary }]}
          numberOfLines={1}>
          {headerText}
        </Text>
      </View>
    );
  },
  renderNavBarRightButton(onPress, icon = 'chevron-left') {
    let iconName = icon;
    if (icon === 'close') iconName = 'times';
    if (icon == 'menu') iconName = 'bars';
    return (
      <TouchableOpacity
        style={{ marginRight: 20, paddingBottom: Platform.OS === 'android' ? 5 : 5 }}
        onPress={onPress} >
        <Icon name={iconName} size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
  renderCheckboxTopicListItem(item, onPress) {
    return (
      <MKButton
        key={item.id}
        style={Styles.listItemContainer}
        backgroundColor={Colors.backgroundSecondary}
        onPress={onPress}>
        <View style={Styles.horzCenter}>
          <View style={[Styles.center, { flex: 3 }]}>
            {item.isTop10 ?
              this.renderApple(0, 'big') : this.renderApple(2, 'big')}
          </View>
          <View style={{ flex: 12 }}>
            <Text style={Fonts.style.listItemTitleText} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={Fonts.style.listItemDescriptionText} numberOfLines={1}>
              3{I18n.t('TIPS_FOUND')}
            </Text>
          </View>
          <View style={styles.checkboxIconContainer}>
            <MKCheckbox
              checked={false}
            />
          </View>
        </View>
      </MKButton>
    );
  },

  renderTipListItem(item, onPress) {
    return (
      <MKButton
        key={item.id}
        style={Styles.listItemContainer}
        backgroun dColor={Colors.backgroundSecondary}
        onPress={onPress}>
        <View style={Styles.horzCenter}>
          <View style={[Styles.horzCenter, { flex: 10 }]}>
            {this.renderTipDetails(item, false, () => {})}
          </View>
          {this.renderForwardIcon()}
        </View>
      </MKButton>
    );
  },


  renderSettingSwitchGroup(title, desc, onChange) {
    return (
      <View>
        <View style={Styles.horzCenter}>
          <Text style={[Fonts.style.fieldInput, { flex: 4 }]}>
            {title}
          </Text>
          <MKSwitch
            style={{ flex: 1 }}
            checked
            trackSize={25}
            trackLength={50}
            onColor={Colors.rippleSecondary}
            thumbOnColor={Colors.brandSEcondary}
            thumbOffColor={Colors.textThird}
            rippleColor={Colors.rippleSecondary}
            onCheckedChange={onChange} />
        </View>
        <Text
          style={[Fonts.style.listItemDescriptionText, {
            lineHeight: 14,
            color: Colors.fieldPlaceholder,
            marginTop: Platform.OS === 'ios' ? -Metrics.defaultMargin / 2 : -Metrics.defaultMargin }]}>
          {desc}
        </Text>
      </View>
    );
  },
  renderSettingHelpButtons(text, onPress) {
    return (
      <View>
        {this.renderSpacer(0.5)}
        <TouchableOpacity onPress={onPress}>
          <Text style={Fonts.style.fieldInput}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
};



export default CommonWidgets;