import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarComponent } from './marcar.component';

describe('MarcarComponent', () => {
  let component: MarcarComponent;
  let fixture: ComponentFixture<MarcarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
