import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';


describe('RuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });

  it('should detect regularity', () => {
    const service: DateService = TestBed.get(DateService);

    const randomSundays = ['2019-09-01', '2019-09-08'];
    expect(service.isEveryFirst(randomSundays)).toEqual(false);

    const sundayAndMonday = ['2019-09-01', '2019-09-09'];
    expect(service.isEveryFirst(sundayAndMonday)).toEqual(false);


    const skippingOctober = ['2019-09-01', '2019-11-03'];
    expect(service.isEveryFirst(skippingOctober)).toEqual(false);

    const datesEverySecondSunday = ['2019-09-08', '2019-10-13'];
    expect(service.isEveryFirst(datesEverySecondSunday)).toEqual(false);


    // const datesEveryFirstMonday = ['2019-09-02', '2019-10-07'];
    // expect(service.isEveryFirst(datesEveryFirstMonday)).toEqual(true);

    const datesEveryFirstSunday = ['2019-09-01', '2019-10-06'];
    expect(service.isEveryFirst(datesEveryFirstSunday)).toEqual(true);

  });

});
