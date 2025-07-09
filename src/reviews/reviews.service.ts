import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    onlyApproved: boolean = true,
  ): Promise<{
    data: Review[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    queryBuilder.where('review.isActive = :isActive', { isActive: true });

    if (onlyApproved) {
      queryBuilder.andWhere('review.isApproved = :isApproved', {
        isApproved: true,
      });
    }

    queryBuilder
      .orderBy('review.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async approve(id: number): Promise<Review> {
    const review = await this.findOne(id);
    review.isApproved = true;
    return this.reviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    review.isActive = false;
    await this.reviewRepository.save(review);
  }

  async getStats(): Promise<{ averageRating: number; totalReviews: number }> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'averageRating')
      .addSelect('COUNT(review.id)', 'totalReviews')
      .where('review.isApproved = :isApproved', { isApproved: true })
      .andWhere('review.isActive = :isActive', { isActive: true })
      .getRawOne();

    return {
      averageRating: parseFloat(result.averageRating) || 0,
      totalReviews: parseInt(result.totalReviews) || 0,
    };
  }
}
