//
//  TestScrollViewManager.m
//  NativeTest
//
//  Created by 朱源浩 on 16/8/27.
//  Copyright © 2016年 稀饭. All rights reserved.
//

#import "TestScrollViewManager.h"
#import "TestScrollView.h"      //第三方组件的头文件
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@interface TestScrollViewManager() <SDCycleScrollViewDelegate>

@end

@implementation TestScrollViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(autoScrollTimeInterval, CGFloat);

RCT_EXPORT_VIEW_PROPERTY(imageURLStringsGroup, NSArray);

RCT_EXPORT_VIEW_PROPERTY(autoScroll, BOOL);

RCT_EXPORT_VIEW_PROPERTY(pageControlAliment, NSInteger);

RCT_EXPORT_VIEW_PROPERTY(onClickBanner, RCTBubblingEventBlock)


- (UIView *)view
{
    TestScrollView *testScrollView = [TestScrollView cycleScrollViewWithFrame:CGRectZero delegate:self placeholderImage:nil];
    testScrollView.pageControlStyle = SDCycleScrollViewPageContolStyleClassic;
    testScrollView.pageControlAliment = SDCycleScrollViewPageContolAlimentCenter;
    return testScrollView;
}


#pragma mark SDCycleScrollViewDelegate

//- (NSArray *) customDirectEventTypes {
//    return @[@"onClickBanner"];
//}

/**
 *  banner点击
 */
- (void)cycleScrollView:(TestScrollView *)cycleScrollView didSelectItemAtIndex:(NSInteger)index
{
    
//    [self.bridge.eventDispatcher sendInputEventWithName:@"onClickBanner"
//                                                   body:@{@"target": cycleScrollView.reactTag,
//                                                          @"value": [NSNumber numberWithInteger:index+1]
//                                                        }];
    
    if (!cycleScrollView.onClickBanner) {
        return;
    }
    
    NSLog(@"oc did click %li", [cycleScrollView.reactTag integerValue]);
    
    cycleScrollView.onClickBanner(@{@"target": cycleScrollView.reactTag,
                                    @"value": [NSNumber numberWithInteger:index+1]});
    
}

- (NSDictionary *)constantsToExport
{
    return @{
             @"SDCycleScrollViewPageContolAliment": @{
                     @"right": @(SDCycleScrollViewPageContolAlimentRight),
                     @"center": @(SDCycleScrollViewPageContolAlimentCenter)
                     }
             };
}

RCT_EXPORT_METHOD(testResetTime:(RCTResponseSenderBlock)callback) {
    
    callback(@[@(234)]);
}

@end
