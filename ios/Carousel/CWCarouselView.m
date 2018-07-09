//
//  CWXJJView.m
//  CWCarousel
//
//  Created by 杨小北 on 2018/7/9.
//  Copyright © 2018年 ChenWang. All rights reserved.
//

#import "CWCarouselView.h"
#import "CWCarousel.h"

#define kViewTag 666
#define kCount 4

@interface CWCarouselView ()<CWCarouselDatasource, CWCarouselDelegate>

@property (nonatomic, strong) CWCarousel *carousel;

@end

@implementation CWCarouselView

/*
 // Only override drawRect: if you perform custom drawing.
 // An empty implementation adversely affects performance during animation.
 - (void)drawRect:(CGRect)rect {
 // Drawing code
 }
 */

- (instancetype)init{
  self = [[CWCarouselView alloc] initWithFrame:CGRectMake(0, 240, 375, 230)];
  CWFlowLayout *flowLayout = [[CWFlowLayout alloc] initWithStyle:CWCarouselStyle_H_2];
  CWCarousel *carousel = [[CWCarousel alloc] initWithFrame:self.bounds
                                                  delegate:self
                                                datasource:self
                                                flowLayout:flowLayout];
  [carousel registerViewClass:[UICollectionViewCell class] identifier:@"cellId"];
  [carousel freshCarousel];
  self.carousel = carousel;
  [self addSubview:self.carousel];
  return self;
}

- (NSInteger)numbersForCarousel {
  return kCount;
}

- (UICollectionViewCell *)viewForCarousel:(CWCarousel *)carousel indexPath:(NSIndexPath *)indexPath index:(NSInteger)index{
  UICollectionViewCell *cell = [carousel.carouselView dequeueReusableCellWithReuseIdentifier:@"cellId" forIndexPath:indexPath];
  cell.contentView.backgroundColor = [UIColor cyanColor];
  UIImageView *imgView = [cell.contentView viewWithTag:kViewTag];
  if(!imgView) {
    imgView = [[UIImageView alloc] initWithFrame:cell.contentView.bounds];
    imgView.tag = kViewTag;
    imgView.backgroundColor = [UIColor redColor];
    [cell.contentView addSubview:imgView];
    cell.layer.masksToBounds = YES;
    cell.layer.cornerRadius = 8;
  }
  NSString *name = [NSString stringWithFormat:@"%02ld.jpg", index + 1];
  UIImage *img = [UIImage imageNamed:name];
  if(!img) {
    NSLog(@"%@", name);
  }
  NSLog(@"%@", name);
  [imgView setImage:img];
  return cell;
}

- (void)CWCarousel:(CWCarousel *)carousel didSelectedAtIndex:(NSInteger)index {
  NSLog(@"...%ld...", index);
}


@end

