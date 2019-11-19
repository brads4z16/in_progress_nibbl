import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChunkComponent } from './new-chunk.component';

describe('NewChunkComponent', () => {
  let component: NewChunkComponent;
  let fixture: ComponentFixture<NewChunkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChunkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
