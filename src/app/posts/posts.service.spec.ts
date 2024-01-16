import { TestBed } from '@angular/core/testing';

import { PostsListService } from './post.list.service';

describe('PostsService', () => {
  let service: PostsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
