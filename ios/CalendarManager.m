//
//  CalendarManager.m
//  NativeTest
//
//  Created by 朱源浩 on 16/8/19.
//  Copyright © 2016年 稀饭. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@implementation CalendarManager

@synthesize bridge=_bridge;

//  默认名称
RCT_EXPORT_MODULE()

/**
//  指定执行模块里的方法所在的队列
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
*/

- (void)showInfo:(NSString *)info
{
    //  更新UI操作在主线程中执行
    dispatch_async(dispatch_get_main_queue(), ^{
        //Update UI in UI thread here
        NSLog(@"testinfo %@", info);
        [[NSNotificationCenter defaultCenter] postNotificationName:@"react_native_test" object:nil userInfo:@{@"info": info}];
    });
}

- (void)showDate:(NSDate *)date withName:(NSString *)name forSomething:(NSString *)thing
{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
    [formatter setDateFormat:@"yyyy-MM-dd"];
    
    NSString *info = [NSString stringWithFormat:@"Test: %@\nFor: %@\nTestTime: %@", name, thing,[formatter stringFromDate:date]];
    
    NSLog(@"%@", info);
    
    [self showInfo:info];
}


//  对外提供调用方法
RCT_EXPORT_METHOD(testNormalEvent:(NSString *)name forSomething:(NSString *)thing){
    
    NSString *info = [NSString stringWithFormat:@"Test: %@\nFor: %@", name, thing];
    
    NSLog(@"%@", info);
    
    [self showInfo:info];
}

//  对外提供调用方法,为了演示事件时间格式化 secondsSinceUnixEpoch
RCT_EXPORT_METHOD(testDateEventOne:(NSString *)name forSomething:(NSString *)thing data:(NSNumber*)secondsSinceUnixEpoch){
    NSDate *date = [RCTConvert NSDate:secondsSinceUnixEpoch];
    [self showDate:date withName:name forSomething:thing];
}

//  对外提供调用方法,为了演示事件时间格式化 ISO8601DateString
RCT_EXPORT_METHOD(testDateEventTwo:(NSString *)name forSomething:(NSString *)thing date:(NSString *)ISO8601DateString)
{
    NSDate *date = [RCTConvert NSDate:ISO8601DateString];
    [self showDate:date withName:name forSomething:thing];
}

//  对外提供调用方法,为了演示事件时间格式化 自动类型转换
RCT_EXPORT_METHOD(testDateEvent:(NSString *)name forSomething:(NSString *)thing date:(NSDate *)date)
{
    [self showDate:date withName:name forSomething:thing];
}

//  对外提供调用方法,为了演示事件传入属性字段
RCT_EXPORT_METHOD(testDictionaryEvent:(NSString *)name details:(NSDictionary *) dictionary)
{
    NSString *location = [RCTConvert NSString:dictionary[@"thing"]];
    NSDate *time = [RCTConvert NSDate:dictionary[@"time"]];
    NSString *description=[RCTConvert NSString:dictionary[@"description"]];
    
    NSString *info = [NSString stringWithFormat:@"Test: %@\nFor: %@\nTestTime: %@\nDescription: %@",name,location,time,description];
    
    NSLog(@"%@", info);
    
    [self showInfo:info];
}



//  对外提供调用方法,演示Callback
RCT_EXPORT_METHOD(testCallbackEvent:(RCTResponseSenderBlock)callback)
{
    [self showInfo:@"测试callback"];
    
    NSArray *events=@[@"callback ", @"test ", @" array"];
    callback(@[[NSNull null],events]);
}


//  对外提供调用方法,演示Promise使用
RCT_REMAP_METHOD(testPromiseEvent,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [self showInfo:@"测试Promise"];
    
    NSArray *events =@[@"Promise ",@"test ",@" array"];
    if (events) {
        resolve(events);
    } else {
        NSError *error=[NSError errorWithDomain:@"我是Promise回调错误信息..." code:101 userInfo:nil];
        reject(@"no_events", @"There were no events", error);
    }
}



//  对外提供调用方法,演示Thread使用
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        // 在后台执行耗时操作
        // You can invoke callback from any thread/queue
        callback(@[[NSNull null],@"耗时操作执行完成..."]);
    });
}



//  进行设置封装常量给JavaScript进行调用
-(NSDictionary *)constantsToExport{
    // 此处定义的常量为js订阅原生通知的通知名
    return @{@"receiveNotificationName":@"receive_notification_test"};
}



//  开始订阅通知事件
RCT_EXPORT_METHOD(startReceiveNotification:(NSString *)name){
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(calendarEventReminderReceived:)
                                                 name:name
                                               object:nil];
}

//  进行设置发送事件通知给JavaScript端
- (void)calendarEventReminderReceived:(NSNotification *)notification
{
    NSString *name = [notification userInfo][@"name"];
    [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                                                 body:@{@"name": name}];
}

@end
