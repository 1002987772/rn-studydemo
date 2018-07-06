//
//  MapManager.m
//  RNClient
//
//  Created by 杨小北 on 2018/7/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "MapManager.h"

#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager

@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
