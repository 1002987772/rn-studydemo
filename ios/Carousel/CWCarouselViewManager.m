//
//  CWCarouselViewManager.m
//  RNClient
//
//  Created by 杨小北 on 2018/7/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CWCarouselViewManager.h"
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import "CWCarouselView.h"

@implementation CWCarouselViewManager

- (UIView *)view
{
  return [[CWCarouselView alloc] init];
}


/**
  导出模块
 **/
RCT_EXPORT_MODULE()

/**
  导出一个output方法
 **/
RCT_EXPORT_METHOD(RNOutputStr:(NSString *)msg andName:(NSString *)name){
  NSLog(@"RN传入原生界面的msg为:%@",msg);
  NSLog(@"RN传入原生界面的name为:%@",name);
}


/**
  主线程
 **/
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
