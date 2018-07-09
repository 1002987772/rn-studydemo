//
//  PushNative.h
//  RNClient
//
//  Created by 杨小北 on 2018/7/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// 导入RCTBridgeModule类，这个是react-native提供
#import <React/RCTBridgeModule.h>
// 遵守RCTBridgeModul协议
@interface PushNative : NSObject<RCTBridgeModule>

@end

