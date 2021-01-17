import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupConfigComponent } from './lookup-config.component';

describe('LookupConfigComponent', () => {
  let component: LookupConfigComponent;
  let fixture: ComponentFixture<LookupConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
