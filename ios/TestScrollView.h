//
//  TestScrollView.h
//  NativeTest
//
//  Created by 朱源浩 on 16/8/27.
//  Copyright © 2016年 稀饭. All rights reserved.
//

#import "SDCycleScrollView.h"
#import <React/RCTComponent.h>

@interface TestScrollView : SDCycleScrollView

@property (nonatomic, copy) RCTBubblingEventBlock onClickBanner;

@end
